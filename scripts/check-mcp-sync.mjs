#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_URL = "https://corply.dev/mcp";
const OPENAI_DIRECTORY_URL = "https://corply.dev/mcp/openai";
const LIVE_URL = process.env.CORPLY_MCP_URL || PUBLIC_URL;
const LIVE_OPENAI_DIRECTORY_URL =
  process.env.CORPLY_OPENAI_MCP_URL || new URL("/mcp/openai", LIVE_URL).toString();
const SKIP_LIVE_MCP = /^(1|true)$/i.test(process.env.CORPLY_SKIP_LIVE_MCP || "");
const EXPECTED_PLUGIN_VERSION = "0.6.1";
const EXPECTED_MCP_VERSION = "0.8.0";
const errors = [];

const REQUIRED_CORE_TOOLS = [
  "get_company_briefing",
  "adopt_existing_company",
  "whoami",
  "get_org",
  "get_status",
  "prepare_83b_tin_input",
  "get_cap_table",
  "import_cap_table",
  "save_application",
  "amend_frozen_application",
  "validate_application",
  "check_company_names",
  "generate_documents",
  "request_payment",
  "await_payment",
  "request_signature",
  "sign_bundle",
  "submit_for_formation",
  "remember",
  "recall",
  "invite_member",
  "redeem_invite",
  "invite_cofounders",
  "nudge_signer",
  "mark_task_done",
];

const REQUIRED_OPERATING_TOOLS = [
  "resolve_company_plan",
  "upsert_operating_subject",
  "manage_operating_access_grant",
  "record_operating_fact",
  "record_operating_event",
  "upload_operating_evidence",
  "record_operating_evidence",
  "submit_operating_fact_evidence",
  "record_existing_completion",
  "transition_operating_work_item",
];

const REQUIRED_CORPLY_PAY_TOOLS = [
  "prepare_revenue_launch",
  "get_payment_pipeline_status",
  "create_payment_route_draft",
  "start_payment_route_onboarding",
  "refresh_payment_route_onboarding",
  "reconcile_payment_route",
  "run_sandbox_payment_probe",
  "run_sandbox_payout_probe",
  "create_payment_project",
  "configure_payment_catalog",
  "create_payment_integration_bundle",
  "verify_payment_integration",
];

const REQUIRED_BANK_TOOLS = [
  "open_bank_account",
  "bank_transfer",
  "get_bank_overview",
  "issue_card",
  "create_agent_wallet",
  "update_agent_wallet",
  "wallet_spend",
  "respond_to_approval",
  "list_bank_activity",
];

const REQUIRED_HOSTED_PAYMENT_TOOLS = [
  "create_payment_portal",
  "create_payment_link",
  "list_portal_payments",
];

const REQUIRED_PUBLIC_TOOLS = [
  ...REQUIRED_CORE_TOOLS,
  ...REQUIRED_CORPLY_PAY_TOOLS,
  ...REQUIRED_BANK_TOOLS,
  ...REQUIRED_HOSTED_PAYMENT_TOOLS,
  ...REQUIRED_OPERATING_TOOLS,
];

const REQUIRED_OPENAI_DIRECTORY_TOOLS = [
  "get_company_briefing",
  "adopt_existing_company",
  "whoami",
  "get_org",
  "get_status",
  "get_cap_table",
  "import_cap_table",
  "save_application",
  "validate_application",
  "check_company_names",
  "generate_documents",
  "remember",
  "recall",
  "invite_member",
  "redeem_invite",
  "mark_task_done",
  ...REQUIRED_OPERATING_TOOLS,
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

async function rpc(url, method, params) {
  const response = await fetch(url, {
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
const actionProtocol = readText("skills/corply/references/action-protocol.md");
const normalizedActionProtocol = actionProtocol.toLowerCase().replace(/\s+/g, " ");
const revenueAndPayments = readText("skills/corply/references/revenue-and-payments.md");
const normalizedRevenueAndPayments = revenueAndPayments.toLowerCase().replace(/\s+/g, " ");
const authentication = readText("skills/corply/references/authentication.md");
const normalizedAuthentication = authentication.toLowerCase().replace(/\s+/g, " ");
const submission = readText("submission/README.md");

checkEqual(".mcp.json corply type", mcp.mcpServers?.corply?.type, "http");
checkEqual(".mcp.json corply URL", mcp.mcpServers?.corply?.url, PUBLIC_URL);

for (const [name, manifest] of [
  ["Codex manifest", codex],
  ["Claude manifest", claude],
  ["Cursor manifest", cursor],
]) {
  checkEqual(`${name} version`, manifest.version, EXPECTED_PLUGIN_VERSION);
  checkEqual(`${name} MCP config path`, manifest.mcpServers, "./.mcp.json");
}

const claudeEntry = claudeMarketplace.plugins?.find((plugin) => plugin.name === "corply");
checkEqual("Claude marketplace version", claudeEntry?.version, EXPECTED_PLUGIN_VERSION);
checkEqual("MCP Registry version", server.version, EXPECTED_MCP_VERSION);

const remoteUrls = Array.isArray(server.remotes) ? server.remotes.map((remote) => remote.url) : [];
checkEqual("MCP Registry remote count", remoteUrls.length, 1);
checkEqual("MCP Registry remote URL", remoteUrls[0], PUBLIC_URL);
if (!submission.includes(`- **MCP server:** ${OPENAI_DIRECTORY_URL}`)) {
  errors.push("OpenAI submission kit is not using the restricted directory MCP endpoint");
}

if (!skill.includes("Before we start: Corply is software, not a law firm, and does not provide legal, tax, or accounting advice.")) {
  errors.push("Corply skill is missing the required pre-intake notice");
}
if (!normalizedFormation.includes("call `invite_member` for each of them immediately")) {
  errors.push("formation guidance is missing early confirmed cofounder invitations");
}
if (!normalizedFormation.includes("never block document generation") || formation.includes("Continue only after")) {
  errors.push("formation guidance still treats company-name checking as a document gate");
}
for (const invariant of [
  "call `request_payment` without another confirmation",
  "call `request_signature` without another confirmation",
  "`sign_bundle`",
  "the only signature or confirmation",
  "`prepare_83b_tin_input`",
  "corply ops receives the short-lived encrypted mail-ready pdf, prints and mails the election",
]) {
  if (!normalizedFormation.toLowerCase().includes(invariant)) {
    errors.push(`formation guidance is missing low-friction signing invariant ${invariant}`);
  }
}
for (const invariant of [
  "creating or reusing an incorporation-fee checkout link",
  "preparing or reusing a private signing bundle and review link",
  "never loop over individual signature rows",
  "corply ops then prints and mails it without another chat confirmation",
]) {
  if (!normalizedActionProtocol.includes(invariant)) {
    errors.push(`action protocol is missing low-friction invariant ${invariant}`);
  }
}
if (!skill.includes("[revenue-and-payments.md](references/revenue-and-payments.md)")) {
  errors.push("Corply skill does not route customer-payment work to revenue-and-payments.md");
}
for (const name of REQUIRED_CORPLY_PAY_TOOLS) {
  if (!revenueAndPayments.includes(`\`${name}\``)) {
    errors.push(`revenue-and-payments guidance is missing coordinated tool ${name}`);
  }
}
for (const boundary of [
  "kyb/kyc",
  "terms",
  "bank and payouts",
  "go-live",
  "refunds and money movement",
]) {
  if (!normalizedRevenueAndPayments.includes(boundary)) {
    errors.push(`revenue-and-payments guidance is missing human boundary ${boundary}`);
  }
}
if (
  !normalizedRevenueAndPayments.includes("customer payments are separate from corply's incorporation fee") ||
  !normalizedRevenueAndPayments.includes("never use `request_payment` or `await_payment`")
) {
  errors.push("revenue-and-payments guidance does not separate customer payments from the incorporation fee");
}
for (const invariant of [
  "makes zero provider calls and moves no money",
  "cannot accept or store provider credentials",
  "does not create or activate an external account",
  "do not claim a charge or payout from a simulator or mocked http test",
]) {
  if (!normalizedRevenueAndPayments.includes(invariant)) {
    errors.push(`revenue-and-payments guidance is missing no-side-effect invariant ${invariant}`);
  }
}
for (const invariant of [
  "integrity-verified catalog and checkout order",
  "opaque hosted payment-method token",
  "recover before retrying",
  "sums to zero in one currency",
  "provider webhooks use exact raw bytes",
  "separately approved live policy",
]) {
  if (!normalizedRevenueAndPayments.includes(invariant)) {
    errors.push(`revenue-and-payments guidance is missing runtime trust invariant ${invariant}`);
  }
}
for (const stateTruth of [
  "get_payment_pipeline_status",
  "create_payment_route_draft",
  "start_payment_route_onboarding",
  "refresh_payment_route_onboarding",
  "reconcile_payment_route",
  "run_sandbox_payment_probe",
  "run_sandbox_payout_probe",
  "in-memory stores are test fixtures only",
]) {
  if (!normalizedRevenueAndPayments.includes(stateTruth)) {
    errors.push(`revenue-and-payments guidance is missing payment workflow truth ${stateTruth}`);
  }
}
if (!authentication.includes("TERMS_ACCEPTANCE_REQUIRED")) {
  errors.push("authentication guidance is missing current-terms recovery");
}
if (
  !normalizedAuthentication.includes("immediately run this command yourself") ||
  !normalizedAuthentication.includes("claude mcp login plugin:corply:corply") ||
  !normalizedAuthentication.includes("background execution") ||
  !normalizedAuthentication.includes("do not ask the founder to type the command")
) {
  errors.push("authentication guidance is missing automatic Claude Code login recovery");
}

const agentYaml = readText("skills/corply/agents/openai.yaml");
const yamlUrls = agentYaml.match(/https:\/\/[^\s"']+/g) ?? [];
checkEqual("Corply skill dependency URL count", yamlUrls.length, 1);
checkEqual("Corply skill dependency URL", yamlUrls[0], PUBLIC_URL);
for (const requiredYamlLine of [
  'display_name: "Corply"',
  'short_description: "Incorporate, run, and prepare a revenue launch with Corply."',
  "allow_implicit_invocation: true",
  '- type: "mcp"',
  'value: "corply"',
  'transport: "streamable_http"',
]) {
  if (!agentYaml.includes(requiredYamlLine)) {
    errors.push(`Corply skill agent metadata is missing ${requiredYamlLine}`);
  }
}

for (const [name, manifest] of [
  ["Codex manifest", codex],
  ["Claude manifest", claude],
  ["Cursor manifest", cursor],
]) {
  const keywords = new Set(manifest.keywords ?? []);
  for (const keyword of ["payments", "revenue", "checkout"]) {
    if (!keywords.has(keyword)) errors.push(`${name} is missing discovery keyword ${keyword}`);
  }
}
const defaultPrompts = codex.interface?.defaultPrompt ?? [];
if (defaultPrompts.length > 3) errors.push("Codex manifest has more than three default prompts");
if (!defaultPrompts.some((prompt) => /first[- ]payment|payment route/i.test(prompt))) {
  errors.push("Codex manifest is missing the customer-payment starter prompt");
}

if (!SKIP_LIVE_MCP) {
  try {
    const initialized = await rpc(LIVE_URL, "initialize", {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "corply-plugin-sync-check", version: EXPECTED_PLUGIN_VERSION },
    });
    checkEqual("live MCP version", initialized?.serverInfo?.version, EXPECTED_MCP_VERSION);
    const [{ tools = [] }, { prompts = [] }] = await Promise.all([
      rpc(LIVE_URL, "tools/list"),
      rpc(LIVE_URL, "prompts/list"),
    ]);
    const toolNames = new Set(tools.map((tool) => tool.name));
    checkEqual("live public tool count", toolNames.size, REQUIRED_PUBLIC_TOOLS.length);
    for (const name of REQUIRED_PUBLIC_TOOLS) {
      if (!toolNames.has(name)) errors.push(`live MCP is missing required public tool ${name}`);
    }
    for (const name of toolNames) {
      if (!REQUIRED_PUBLIC_TOOLS.includes(name)) errors.push(`live MCP exposes unexpected public tool ${name}`);
    }
    for (const name of PRIVATE_REVIEWER_TOOLS) {
      if (toolNames.has(name)) errors.push(`live MCP exposes private reviewer tool ${name}`);
    }
    if (toolNames.has("record_signature")) {
      errors.push("live MCP still exposes removed per-document record_signature");
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
  try {
    const initialized = await rpc(LIVE_OPENAI_DIRECTORY_URL, "initialize", {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "corply-openai-directory-sync-check", version: EXPECTED_PLUGIN_VERSION },
    });
    checkEqual("OpenAI directory MCP version", initialized?.serverInfo?.version, EXPECTED_MCP_VERSION);
    const [{ tools = [] }, { prompts = [] }] = await Promise.all([
      rpc(LIVE_OPENAI_DIRECTORY_URL, "tools/list"),
      rpc(LIVE_OPENAI_DIRECTORY_URL, "prompts/list"),
    ]);
    const toolNames = new Set(tools.map((tool) => tool.name));
    checkEqual(
      "OpenAI directory public tool count",
      toolNames.size,
      REQUIRED_OPENAI_DIRECTORY_TOOLS.length,
    );
    for (const name of REQUIRED_OPENAI_DIRECTORY_TOOLS) {
      if (!toolNames.has(name)) errors.push(`OpenAI directory MCP is missing required tool ${name}`);
    }
    for (const name of toolNames) {
      if (!REQUIRED_OPENAI_DIRECTORY_TOOLS.includes(name)) {
        errors.push(`OpenAI directory MCP exposes unexpected tool ${name}`);
      }
    }
    for (const tool of tools) {
      const description = String(tool.description ?? "").toLowerCase();
      for (const label of ["prerequisite:", "canonicality:", "idempotency:", "confirmation boundary:"]) {
        if (!description.includes(label)) {
          errors.push(`OpenAI directory tool ${tool.name} is missing ${label}`);
        }
      }
    }
    checkEqual("OpenAI directory bootstrap prompt count", prompts.length, 1);
    checkEqual("OpenAI directory bootstrap prompt", prompts[0]?.name, "corply");
  } catch (error) {
    errors.push(
      `could not inspect OpenAI directory MCP at ${LIVE_OPENAI_DIRECTORY_URL}: ${error.message}`,
    );
  }
}

if (errors.length > 0) {
  console.error(
    SKIP_LIVE_MCP
      ? "Corply plugin local contract checks failed:\n"
      : "Corply plugin and deployed MCP are out of sync:\n",
  );
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else if (SKIP_LIVE_MCP) {
  console.log(
    `Corply plugin ${EXPECTED_PLUGIN_VERSION} passes local contract checks; live MCP check intentionally skipped.`,
  );
} else {
  console.log(
    `Corply plugin ${EXPECTED_PLUGIN_VERSION} matches MCP ${EXPECTED_MCP_VERSION} at ${LIVE_URL}.`,
  );
}
