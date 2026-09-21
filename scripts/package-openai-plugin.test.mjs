import assert from "node:assert/strict";
import { mkdtemp, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { packageMappings, buildArchive, archiveFile, archiveEntries, validateArchive } from "./package-openai-plugin.mjs";

test("directory upload is isolated from general plugin instructions", async () => {
  const { skill, full } = await packageMappings();
  assert.deepEqual([...skill.keys()].sort(), ["skills/corply/SKILL.md", "skills/corply/agents/openai.yaml"]);
  assert.equal(skill.get("skills/corply/SKILL.md"), "submission/openai/skills/corply/SKILL.md");
  assert.ok(full.has("corply/.codex-plugin/plugin.json"));
  assert.ok(full.has("corply/.claude-plugin/plugin.json"));
  assert.ok(full.has("corply/.cursor-plugin/plugin.json"));
  assert.ok(full.has("corply/skills/corply/references/formation.md"));
  for (const entry of full.keys()) {
    assert.doesNotMatch(entry, /(?:submission|scripts|\.git\/|\.env|revenue-and-payments|existing-company\.md)/);
  }
});

test("general plugin consistently ships the BUSL-1.1 license", async () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const license = await readFile(path.join(root, "LICENSE"), "utf8");
  assert.match(license, /^Business Source License 1\.1/m);
  assert.match(license, /^Licensor:\s+0Lumen Labs Corp\.$/m);
  assert.match(license, /^Additional Use Grant:\s+None$/m);
  assert.match(license, /^Change License:\s+Apache License, Version 2\.0$/m);

  for (const manifest of [".codex-plugin/plugin.json", ".claude-plugin/plugin.json", ".cursor-plugin/plugin.json"]) {
    const contents = JSON.parse(await readFile(path.join(root, manifest), "utf8"));
    assert.equal(contents.version, "0.8.1", `${manifest} must identify the relicensed release`);
    assert.equal(contents.license, "BUSL-1.1", `${manifest} must not advertise a permissive license`);
  }

  const marketplace = JSON.parse(await readFile(path.join(root, ".claude-plugin/marketplace.json"), "utf8"));
  assert.equal(marketplace.plugins[0].version, "0.8.1");

  const { skill, full } = await packageMappings();
  assert.ok(!skill.has("LICENSE"), "the OpenAI directory skill must remain an instructions-only upload");
  assert.equal(full.get("corply/LICENSE"), "LICENSE");
});

test("archives are deterministic and byte-verified against their own sources", async () => {
  const mappings = await packageMappings();
  const temporary = await mkdtemp(path.join(tmpdir(), "corply-package-test-"));
  try {
    for (const [kind, mapping] of Object.entries(mappings)) {
      const first = path.join(temporary, `${kind}-1.zip`);
      const second = path.join(temporary, `${kind}-2.zip`);
      await buildArchive(path.join(temporary, `${kind}-1`), first, mapping);
      await buildArchive(path.join(temporary, `${kind}-2`), second, mapping);
      assert.deepEqual(await readFile(first), await readFile(second));
      assert.equal(archiveEntries(first).length, mapping.size);
      const config = kind === "skill" ? "skills/corply/agents/openai.yaml" : "corply/.mcp.json";
      const text = String(archiveFile(first, config));
      if (kind === "skill") assert.match(text, /https:\/\/corply\.dev\/mcp\/openai/);
      else assert.equal(JSON.parse(text).mcpServers.corply.url, "https://corply.dev/mcp");
      const wrongMapping = new Map(mapping);
      wrongMapping.set([...mapping.keys()][0], "LICENSE");
      await assert.rejects(validateArchive(first, wrongMapping), /stale bytes/);
    }
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});
