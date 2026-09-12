#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_URL = "https://corply.dev/mcp";
const DIRECTORY_URL = "https://corply.dev/mcp/openai";
const skipLive = /^(1|true)$/i.test(process.env.CORPLY_SKIP_LIVE_MCP || "");
const submission = process.argv.includes("--submission");
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");
const json = (file) => JSON.parse(read(file));
const errors = [];
const blockers = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const core = ["whoami", "get_org", "get_status", "save_application", "validate_application",
  "check_company_names", "generate_documents"];
const generalFormation = [...core, "get_signature_request", "amend_frozen_application",
  "request_payment", "await_payment", "request_signature", "sign_bundle",
  "submit_for_formation", "prepare_83b_tin_input", "invite_member", "redeem_invite"];
const directoryExcluded = ["get_signature_request", "request_payment", "await_payment",
  "request_signature", "sign_bundle", "submit_for_formation", "prepare_83b_tin_input",
  "amend_frozen_application", "create_payment_portal", "pay_payment_link", "bank_transfer",
  "wallet_spend", "create_payment_route_draft", "start_payment_route_onboarding",
  "run_sandbox_payment_probe", "run_sandbox_payout_probe"];
const upgrades = ["request_registered_agent_upgrade", "await_registered_agent_upgrade"];
const financeName = /^(?:prepare_revenue|.*payment_(?:project|pipeline|route|integration|catalog|portal|link)|configure_payment|verify_payment|run_sandbox|.*bank_onboarding|bank_transfer|wallet_spend)/;

function checkMarkdown(directory) {
  for (const entry of fs.readdirSync(path.join(ROOT, directory), { withFileTypes: true })) {
    const file = directory + "/" + entry.name;
    if (entry.isDirectory()) checkMarkdown(file);
    else if (entry.name.endsWith(".md")) {
      for (const match of read(file).matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
        const target = match[1];
        if (/^(https?:|#)/.test(target)) continue;
        check(fs.existsSync(path.resolve(ROOT, path.dirname(file), target)),
          file + " has missing reference " + target);
      }
    }
  }
}

async function rpc(url, method, params) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    signal: AbortSignal.timeout(15000),
  });
  const payload = await response.json();
  if (!response.ok || payload.error) throw Error(method + " failed at " + url + ": HTTP " + response.status);
  return payload.result;
}

try {
  const codex = json(".codex-plugin/plugin.json");
  const version = codex.version;
  check(/^\d+\.\d+\.\d+$/.test(version), "Plugin version must be semver");
  for (const file of [".codex-plugin/plugin.json", ".claude-plugin/plugin.json", ".cursor-plugin/plugin.json"]) {
    const manifest = json(file);
    check(manifest.name === "corply" && manifest.version === version, file + " version/name mismatch");
    check(manifest.mcpServers === "./.mcp.json", file + " MCP config mismatch");
    check(!manifest.keywords.some((keyword) => ["payments", "banking", "revenue", "checkout"].includes(keyword)),
      file + " still promotes retired financial workflows");
  }
  check(json(".claude-plugin/marketplace.json").plugins[0].version === version, "Marketplace version mismatch");
  check(json(".mcp.json").mcpServers.corply.url === PUBLIC_URL, "General MCP endpoint changed");
  check(json("server.json").remotes[0].url === PUBLIC_URL, "Registry endpoint mismatch");
  check(read("skills/corply/agents/openai.yaml").includes('url: "' + PUBLIC_URL + '"'), "General skill endpoint mismatch");
  check(read("submission/openai/skills/corply/agents/openai.yaml").includes('url: "' + DIRECTORY_URL + '"'),
    "Directory skill endpoint mismatch");
  check(read("submission/README.md").includes("**Plugin source version:** " + version), "Submission version mismatch");
  check(read("submission/README.md").includes("**MCP metadata version:** " + json("server.json").version),
    "Submission MCP version mismatch");
  checkMarkdown("skills");
  checkMarkdown("submission/openai/skills");
  check(!fs.existsSync(path.join(ROOT, "skills/corply/references/revenue-and-payments.md")),
    "Retired revenue reference remains in distributed skill");
  const skill = read("skills/corply/SKILL.md");
  const directorySkill = read("submission/openai/skills/corply/SKILL.md");
  for (const [label, text] of [["general", skill], ["directory", directorySkill]]) {
    for (const invariant of ["actual_tool_output", "context_engineering.prompt", "_corply_context", "whoami"]) {
      check(text.includes(invariant), label + " skill is missing " + invariant);
    }
  }
  check(read("skills/corply/references/authentication.md").includes("ChatGPT on the web"), "Missing ChatGPT OAuth guidance");
  check(read("skills/corply/references/formation.md").includes("newCompanyRequestId"), "Missing separate-company continuity");
  check(read("skills/corply/references/formation.md").includes("get_signature_request"), "Missing signature-email workflow");
  check(codex.interface.defaultPrompt.length <= 3, "Too many starter prompts");

  if (skipLive) {
    check(!submission, "Submission readiness requires live checks");
    console.log("Local plugin " + version + " checks complete; production not contacted.");
  } else {
    const endpoints = [
      ["general", process.env.CORPLY_MCP_URL || PUBLIC_URL, generalFormation],
      ["directory", process.env.CORPLY_OPENAI_MCP_URL || DIRECTORY_URL, core],
    ];
    for (const [label, url, required] of endpoints) {
      const result = await rpc(url, "tools/list");
      const names = new Set(result.tools.map((tool) => tool.name));
      for (const name of required) check(names.has(name), label + " is missing required tool " + name);
      check(names.size === result.tools.length, label + " has duplicate tool names");
      for (const tool of result.tools) {
        for (const annotation of ["readOnlyHint", "openWorldHint", "destructiveHint"]) {
          check(typeof tool.annotations?.[annotation] === "boolean", tool.name + " missing " + annotation);
        }
        check(tool.securitySchemes?.some((scheme) => scheme.type === "oauth2"), tool.name + " missing OAuth policy");
        const variants = tool.inputSchema?.oneOf ?? [tool.inputSchema];
        for (const schema of variants) {
          const context = schema?.properties?._corply_context;
          check(context?.type === "object" && context.additionalProperties === false, tool.name + " missing context control");
          check(!schema.required?.includes("_corply_context"), tool.name + " requires context");
          check(context?.properties?.id?.type === "string" && context?.properties?.receipt?.type === "string",
            tool.name + " invalid context fields");
          check(context?.dependentRequired?.receipt?.includes("id"), tool.name + " invalid receipt dependency");
        }
      }
      const auth = await fetch(url, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "whoami", arguments: {} } }),
        signal: AbortSignal.timeout(15000),
      });
      const denied = await auth.json();
      check(auth.status === 401, label + " unauthenticated identity read was not denied");
      check(auth.headers.get("www-authenticate")?.includes("resource_metadata="), label + " missing discovery challenge");
      check(denied.result?._meta?.["mcp/www_authenticate"]?.length > 0, label + " missing ChatGPT linking challenge");
      if (label === "directory") {
        for (const name of directoryExcluded) check(!names.has(name), "Directory capability changed: " + name);
        for (const name of upgrades) if (names.has(name)) blockers.push("Directory still exposes service checkout/upgrade tool " + name);
        const missing = ["request_signature", "sign_bundle", "submit_for_formation"].filter((name) => !names.has(name));
        if (missing.length) blockers.push("Complete chat incorporation cannot be claimed: directory lacks " + missing.join(", "));
        const info = await rpc(url, "initialize", { protocolVersion: "2025-03-26",
          capabilities: {}, clientInfo: { name: "corply-plugin-contract-check", version } });
        check(info.serverInfo?.version === json("server.json").version, "MCP registry version differs from production");
      } else {
        const financial = [...names].filter((name) => financeName.test(name));
        if (financial.length) console.log("Production general MCP still advertises non-formation tools: " + financial.join(", "));
      }
      console.log(label + ": " + names.size + " live tools; required formation contract checked.");
    }
  }
  for (const blocker of blockers) console.warn("Submission blocker: " + blocker);
  if (submission) errors.push(...blockers);
  assert.equal(errors.length, 0, errors.join("\n"));
  console.log("Plugin " + version + " " + (submission ? "submission checks" : "contract checks") + " passed.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
