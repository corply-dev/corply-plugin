import assert from "node:assert/strict";
import { mkdtemp, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
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
