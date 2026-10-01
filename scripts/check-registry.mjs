// Fail if the public registry drifts from our checked-in directory metadata.
import { readFile, appendFile } from "node:fs/promises";
import assert from "node:assert/strict";
const expected = JSON.parse(await readFile(new URL("../server.json", import.meta.url), "utf8"));
const base = "https://registry.modelcontextprotocol.io/v0.1/servers/" + encodeURIComponent(expected.name) + "/versions/";
const prepare = process.argv.includes("--prepare");
const response = await fetch(base + (prepare ? encodeURIComponent(expected.version) : "latest"), { signal: AbortSignal.timeout(30000) });
if (prepare && response.status === 404) {
  await appendFile(process.env.GITHUB_OUTPUT, "publish=true\n");
  console.log("This version needs publishing.");
} else {
  if (!response.ok) throw new Error(`Registry returned HTTP ${response.status}`);
  const { server } = await response.json();
  for (const field of Object.keys(expected)) {
    assert.deepEqual(server[field], expected[field], `Published ${field} differs. Registry versions are immutable; bump server.json version before republishing.`);
  }
  if (prepare) await appendFile(process.env.GITHUB_OUTPUT, "publish=false\n");
  console.log(`Registry matches ${expected.name}@${expected.version}, including setup URL and branding.`);
}
