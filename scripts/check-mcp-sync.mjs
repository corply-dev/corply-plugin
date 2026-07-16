#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_URL = "https://corply.dev/mcp";
const LIVE_URL = process.env.CORPLY_MCP_URL || PUBLIC_URL;
const EXPECTED_VERSION = "0.4.2";
const errors = [];

const REQUIRED_PUBLIC_TOOLS = [
  "get_company_briefing",
  "adopt_existing_company",
  "save_application",
  "validate_application",
  "check_company_names",
  "invite_member",
  "generate_documents",
  "request_payment",
  "request_signature",
  "record_signature",
  "submit_for_formation",
  "get_status",
  "resolve_company_plan",
  "record_operating_fact",
  "upload_operating_evidence",
  "record_existing_completion",
  "get_cap_table",
  "import_cap_table",
];

const PRIVATE_REVIEWER_TOOLS = [
  "list_operating_fact_evidence_claims",
  "review_operating_fact_evidence",
  "list_existing_completion_claims",
  "review_existing_completion",
];

function readText(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function readJson(relativePath) {
  try {
    return JSON.parse(readText(relativePath));
  } catch (error) {
    errors.push(`${relativePath}: invalid JSON (${error.message})`);
    return {};
  }
}

function checkEqual(label, actual, expected) {
  if (actual !== expected) {
    errors.push(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

async function rpc(method, params) {
  const response = await fetch(LIVE_URL, {
    method: "POST",
    headers: {
      accept: "application/json, text/event-stream",
      "content-type": "application/json",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: method, method, ...(params ? { params } : {}) }),
    signal: AbortSignal.timeout(15_000),
  });
  const body = await response.text();
  if (!response.ok) throw new Error(`${method} returned HTTP ${response.status}: ${body.slice(0, 300)}`);
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    throw new Error(`${method} did not return JSON: ${body.slice(0, 300)}`);
  }
  if (payload.error) throw new Error(`${method} returned ${JSON.stringify(payload.error)}`);
  return payload.result;
}

const mcp = readJson(".mcp.json");
const codex = readJson(".codex-plugin/plugin.json");
const claude = readJson(".claude-plugin/plugin.json");
const claudeMarketplace = readJson(".claude-plugin/marketplace.json");
const cursor = readJson(".cursor-plugin/plugin.json");
const server = readJson("server.json");
const skill = readText("skills/corply/SKILL.md").replace(/\s+/g, " ");
const formation = readText("skills/corply/references/formation.md");
const normalizedFormation = formation.replace(/\s+/g, " ");
const authentication = readText("skills/corply/references/authentication.md");

checkEqual(".mcp.json corply type", mcp.mcpServers?.corply?.type, "http");
checkEqual(".mcp.json corply URL", mcp.mcpServers?.corply?.url, PUBLIC_URL);

for (const [name, manifest] of [
  ["Codex manifest", codex],
  ["Claude manifest", claude],
  ["Cursor manifest", cursor],
]) {
  checkEqual(`${name} version`, manifest.version, EXPECTED_VERSION);
  checkEqual(`${name} MCP config path`, manifest.mcpServers, "./.mcp.json");
}

const claudeEntry = claudeMarketplace.plugins?.find((plugin) => plugin.name === "corply");
checkEqual("Claude marketplace version", claudeEntry?.version, EXPECTED_VERSION);
checkEqual("MCP Registry version", server.version, EXPECTED_VERSION);

const remoteUrls = Array.isArray(server.remotes) ? server.remotes.map((remote) => remote.url) : [];
checkEqual("MCP Registry remote count", remoteUrls.length, 1);
checkEqual("MCP Registry remote URL", remoteUrls[0], PUBLIC_URL);

if (!skill.includes("Before we start: Corply is software, not a law firm, and does not provide legal, tax, or accounting advice.")) {
  errors.push("Corply skill is missing the required pre-intake notice");
}
if (!normalizedFormation.includes("call `invite_member` for each of them immediately")) {
  errors.push("formation guidance is missing early confirmed cofounder invitations");
}
if (!normalizedFormation.includes("never block document generation") || formation.includes("Continue only after")) {
  errors.push("formation guidance still treats company-name checking as a document gate");
}
if (!authentication.includes("TERMS_ACCEPTANCE_REQUIRED")) {
  errors.push("authentication guidance is missing current-terms recovery");
}

const agentYaml = readText("skills/corply/agents/openai.yaml");
const yamlUrls = agentYaml.match(/https:\/\/[^\s"']+/g) ?? [];
checkEqual("Corply skill dependency URL count", yamlUrls.length, 1);
checkEqual("Corply skill dependency URL", yamlUrls[0], PUBLIC_URL);

try {
  const initialized = await rpc("initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "corply-plugin-sync-check", version: EXPECTED_VERSION },
  });
  checkEqual("live MCP version", initialized?.serverInfo?.version, EXPECTED_VERSION);
  const [{ tools = [] }, { prompts = [] }] = await Promise.all([
    rpc("tools/list"),
    rpc("prompts/list"),
  ]);
  const toolNames = new Set(tools.map((tool) => tool.name));
  for (const name of REQUIRED_PUBLIC_TOOLS) {
    if (!toolNames.has(name)) errors.push(`live MCP is missing required public tool ${name}`);
  }
  for (const name of PRIVATE_REVIEWER_TOOLS) {
    if (toolNames.has(name)) errors.push(`live MCP exposes private reviewer tool ${name}`);
  }
  for (const tool of tools) {
    const description = String(tool.description ?? "").toLowerCase();
    for (const label of ["prerequisite:", "canonicality:", "idempotency:", "confirmation boundary:"]) {
      if (!description.includes(label)) errors.push(`live tool ${tool.name} is missing ${label}`);
    }
  }
  checkEqual("live bootstrap prompt count", prompts.length, 1);
  checkEqual("live bootstrap prompt", prompts[0]?.name, "corply");
} catch (error) {
  errors.push(`could not inspect live MCP at ${LIVE_URL}: ${error.message}`);
}

if (errors.length > 0) {
  console.error("Corply plugin and deployed MCP are out of sync:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Corply plugin ${EXPECTED_VERSION} matches the deployed MCP inventory at ${LIVE_URL}.`);
}
