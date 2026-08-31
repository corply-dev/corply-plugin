#!/usr/bin/env node

import { createHash } from "node:crypto";
import { copyFile, chmod, mkdtemp, mkdir, readFile, readdir, rm, stat, utimes } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FIXED_TIME = new Date("2026-01-01T00:00:00.000Z");
const OUTPUTS = {
  skill: "corply-openai-skill-bundle.zip",
  full: "corply-openai-plugin-full.zip",
};
const ROOT_EXCLUDES = new Set([".git", "node_modules", ".DS_Store", ...Object.values(OUTPUTS)]);

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: options.binary ? null : "utf8",
    maxBuffer: 16 * 1024 * 1024,
    ...options,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed: ${String(result.stderr).trim()}`);
  }
  return result.stdout;
}

async function collectFiles(directory = ROOT, prefix = "") {
  const files = [];
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    if ((!prefix && ROOT_EXCLUDES.has(entry.name)) || entry.name === ".DS_Store") continue;
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(absolute, relative));
    else if (entry.isFile()) files.push(relative);
    else throw new Error(`Refusing to package non-regular path: ${relative}`);
  }
  return files;
}

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

function archiveEntries(archive) {
  return String(run("unzip", ["-Z1", archive]))
    .split(/\r?\n/)
    .filter(Boolean);
}

function archiveFile(archive, entry) {
  return run("unzip", ["-p", archive, entry], { binary: true });
}

async function validateArchive(archive, mapping) {
  const expectedEntries = [...mapping.keys()].sort();
  const actualEntries = archiveEntries(archive).sort();
  if (JSON.stringify(actualEntries) !== JSON.stringify(expectedEntries)) {
    throw new Error(`${path.basename(archive)} inventory differs from the source file set.`);
  }
  for (const [entry, source] of mapping) {
    const [sourceBytes, archivedBytes] = await Promise.all([
      readFile(path.join(ROOT, source)),
      Promise.resolve(archiveFile(archive, entry)),
    ]);
    if (digest(sourceBytes) !== digest(archivedBytes)) {
      throw new Error(`${path.basename(archive)} contains stale bytes for ${entry}.`);
    }
  }
}

async function buildArchive(stagingRoot, archive, mapping) {
  for (const [entry, source] of mapping) {
    const target = path.join(stagingRoot, entry);
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(path.join(ROOT, source), target);
    const sourceMode = (await stat(path.join(ROOT, source))).mode & 0o777;
    await chmod(target, sourceMode);
    await utimes(target, FIXED_TIME, FIXED_TIME);
  }
  run("zip", ["-q", "-X", archive, "-@"], {
    cwd: stagingRoot,
    input: `${[...mapping.keys()].sort().join("\n")}\n`,
    env: { ...process.env, TZ: "UTC" },
  });
  await validateArchive(archive, mapping);
}

async function main() {
  const sources = await collectFiles();
  const skillSources = sources.filter((file) => file.startsWith("skills/corply/"));
  if (!skillSources.includes("skills/corply/references/revenue-and-payments.md")) {
    throw new Error("Revenue-and-payments guidance is missing from the skill source set.");
  }

  const skillMapping = new Map(skillSources.map((source) => [source, source]));
  const fullMapping = new Map(sources.map((source) => [`corply/${source}`, source]));
  const temporary = await mkdtemp(path.join(tmpdir(), "corply-plugin-package-"));
  try {
    const stagedSkill = path.join(temporary, OUTPUTS.skill);
    const stagedFull = path.join(temporary, OUTPUTS.full);
    await buildArchive(path.join(temporary, "skill"), stagedSkill, skillMapping);
    await buildArchive(path.join(temporary, "full"), stagedFull, fullMapping);

    const embeddedPlugin = JSON.parse(String(archiveFile(stagedFull, "corply/.codex-plugin/plugin.json")));
    const embeddedServer = JSON.parse(String(archiveFile(stagedFull, "corply/server.json")));
    if (embeddedPlugin.version !== "0.7.2" || embeddedServer.version !== "0.10.0") {
      throw new Error("Packaged plugin must be version 0.7.2 and MCP metadata version 0.10.0.");
    }

    await copyFile(stagedSkill, path.join(ROOT, OUTPUTS.skill));
    await copyFile(stagedFull, path.join(ROOT, OUTPUTS.full));
    await validateArchive(path.join(ROOT, OUTPUTS.skill), skillMapping);
    await validateArchive(path.join(ROOT, OUTPUTS.full), fullMapping);
    console.log(`Built and byte-validated ${OUTPUTS.skill} (${skillMapping.size} files).`);
    console.log(`Built and byte-validated ${OUTPUTS.full} (${fullMapping.size} files).`);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
