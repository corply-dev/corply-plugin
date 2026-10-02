#!/usr/bin/env node
import assert from "node:assert/strict";
import { reviewBlockers } from "./review-readiness.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// The plugin declares the Claude directory profile; the MCP registry lists the general server;
// the OpenAI directory package has its own endpoint.
const PLUGIN_URL = "https://corply.dev/mcp/claude";
const REGISTRY_URL = "https://corply.dev/mcp";
const DIRECTORY_URL = "https://corply.dev/mcp/openai";
const DIRECTORY_PACKAGE_VERSION = "0.8.3";
const skipLive = /^(1|true)$/i.test(process.env.CORPLY_SKIP_LIVE_MCP || "");
const submissionArg = process.argv.find((arg) => arg === "--submission" || arg.startsWith("--submission="));
const submissionTargets = !submissionArg ? [] : submissionArg.includes("=")
  ? submissionArg.split("=")[1].split(",") : ["openai", "anthropic"];
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");
const json = (file) => JSON.parse(read(file));
const errors = [];
const blockers = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const block = (target, message) => blockers.push({ target, message });

// The OpenAI directory's submitted snapshot is the single source for its inventory.
const directoryInventory = json("submission/openai-tool-inventory.json");
const DIRECTORY_TOOLS = directoryInventory.map((tool) => tool.name);
const generalFormation = ["whoami", "get_org", "get_status", "switch_company", "start_company_draft",
  "save_application", "confirm_own_details", "validate_application", "check_company_names",
  "generate_documents", "get_signature_request", "amend_frozen_application", "request_payment",
  "await_payment", "request_signature", "sign_bundle", "submit_for_formation",
  "prepare_83b_tin_input", "invite_member", "redeem_invite", "revoke_invite", "get_cap_table",
  "show_address_picker", "suggest_addresses", "resolve_address", "import_company",
  "create_import_intake"];
const directoryExcluded = ["request_payment", "await_payment", "request_signature", "sign_bundle",
  "submit_for_formation", "prepare_83b_tin_input", "create_payment_portal", "pay_payment_link",
  "bank_transfer", "wallet_spend", "create_payment_route_draft", "start_payment_route_onboarding",
  "run_sandbox_payment_probe", "run_sandbox_payout_probe", "start_bank_onboarding",
  "start_company_domain_checkout", "checkout_charter_filing", "send_inbox_email"];
const upgrades = ["request_registered_agent_upgrade", "await_registered_agent_upgrade"];
const financeName = /^(?:prepare_revenue|.*payment_(?:project|pipeline|route|integration|catalog|portal|link)|configure_payment|verify_payment|run_sandbox|.*bank_onboarding|bank_transfer|wallet_spend|.*payout)/;
const moneyMovement = /payout|transfer|wallet_spend|pay_payment_link/;
// Backticked snake_case words in skills that are fields, not tools.
const NON_TOOL_WORDS = new Set(["actual_tool_output", "fully_vested"]);
const toolWord = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)+$/;

function markdownFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(path.join(ROOT, directory), { withFileTypes: true })) {
    const file = directory + "/" + entry.name;
    if (entry.isDirectory()) files.push(...markdownFiles(file));
    else if (entry.name.endsWith(".md")) files.push(file);
  }
  return files;
}

/** Local links must resolve. The Claude plugin's own skill may link only to Corply's disclosed host. */
function checkMarkdown(directory, { corplyOnly }) {
  for (const file of markdownFiles(directory)) {
    for (const match of read(file).matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1];
      if (target.startsWith("#") || /^https?:/.test(target)) continue;
      check(fs.existsSync(path.resolve(ROOT, path.dirname(file), target)),
        file + " has missing reference " + target);
    }
    if (!corplyOnly) continue;
    for (const [url] of read(file).matchAll(/https?:\/\/[^\s)`"'<>]+/g)) {
      check(new URL(url).hostname === "corply.dev", file + " mentions a URL outside corply.dev: " + url);
    }
  }
}

function toolReferences(directory) {
  const references = new Map();
  for (const file of markdownFiles(directory)) {
    for (const match of read(file).matchAll(/`([^`]+)`/g)) {
      if (toolWord.test(match[1]) && !NON_TOOL_WORDS.has(match[1])) {
        if (!references.has(match[1])) references.set(match[1], file);
      }
    }
  }
  return references;
}

function readmeWords(text) {
  return text.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter((word) => /[A-Za-z]/.test(word)).length;
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
    check(manifest.license === "BUSL-1.1" && manifest.description && manifest.author?.name, file + " missing listing metadata");
    check(!manifest.keywords.some((keyword) => ["payments", "banking", "revenue", "checkout"].includes(keyword)),
      file + " still promotes retired financial workflows");
  }
  const claude = json(".claude-plugin/plugin.json");
  for (const field of ["documentationUrl", "supportUrl", "privacyPolicyUrl", "termsOfServiceUrl"]) {
    check(/^https:\/\/corply\.dev\//.test(claude[field] || ""), ".claude-plugin/plugin.json missing directory field " + field);
  }
  check(claude.icon && fs.existsSync(path.join(ROOT, claude.icon)), "Claude directory icon is missing");
  check(json(".claude-plugin/marketplace.json").plugins[0].version === version, "Marketplace version mismatch");
  check(json(".mcp.json").mcpServers.corply.url === PLUGIN_URL, "Plugin MCP endpoint changed");
  check(json("server.json").remotes[0].url === REGISTRY_URL, "Registry endpoint mismatch");
  check(read("skills/corply/agents/openai.yaml").includes('url: "' + PLUGIN_URL + '"'), "Plugin skill endpoint mismatch");
  check(read("submission/openai/skills/corply/agents/openai.yaml").includes('url: "' + DIRECTORY_URL + '"'),
    "Directory skill endpoint mismatch");
  const directoryManifest = json("submission/openai/.codex-plugin/plugin.json");
  check(directoryManifest.name === "corply" && directoryManifest.version === DIRECTORY_PACKAGE_VERSION,
    "Directory package identity/version mismatch");
  check(json("submission/openai/.mcp.json").mcpServers.corply.url === DIRECTORY_URL, "Directory package MCP endpoint mismatch");
  check(directoryManifest.interface.shortDescription.length <= 30, "Directory subtitle exceeds submission limit");
  check(directoryManifest.extensions["com.openai"].review.test_cases.positive.length === 5, "Exactly five positive cases are required");
  check(directoryManifest.extensions["com.openai"].review.test_cases.negative.length === 3, "Exactly three negative cases are required");
  check(read("submission/anthropic/README.md").includes("**Plugin source version:** " + version), "Claude directory packet version mismatch");
  check(read("submission/anthropic/README.md").includes("**MCP metadata version:** " + json("server.json").version),
    "Claude directory packet MCP version mismatch");
  check(read("submission/README.md").includes("**MCP metadata version:** " + json("server.json").version),
    "Submission MCP version mismatch");
  const readme = read("README.md");
  check(readmeWords(readme) >= 40, "README must have at least 40 words outside code blocks");
  check(/^## What this plugin connects to/m.test(readme), "README must disclose what the plugin connects to");
  checkMarkdown("skills", { corplyOnly: true });
  checkMarkdown("submission/openai/skills", { corplyOnly: false });
  for (const retired of ["revenue-and-payments.md", "existing-company.md"]) {
    check(!fs.existsSync(path.join(ROOT, "skills/corply/references", retired)), "Retired reference remains: " + retired);
  }
  for (const entry of fs.readdirSync(ROOT, { recursive: true })) {
    const name = String(entry);
    if (name.startsWith(".git" + path.sep) || name.startsWith("node_modules") || name.endsWith(".zip")) continue;
    check(!/(^|[\\/])(\.DS_Store|Thumbs\.db|desktop\.ini|__MACOSX)$/.test(name), "System file in plugin: " + name);
    const stat = fs.statSync(path.join(ROOT, name));
    if (stat.isFile() && !/\.(png|jpe?g|gif|webp)$/i.test(name)) check(stat.size < 256 * 1024, "File over 256 KiB: " + name);
  }
  const skill = read("skills/corply/SKILL.md");
  const directorySkill = read("submission/openai/skills/corply/SKILL.md");
  for (const [label, text] of [["general", skill], ["directory", directorySkill]]) {
    for (const invariant of ["actual_tool_output", "context_engineering.prompt", "_corply_context", "whoami"]) {
      check(text.includes(invariant), label + " skill is missing " + invariant);
    }
  }
  check(!/skills\.md|setup\.md/.test(skill), "The plugin skill must not direct the agent to fetch remote instructions");
  check(read("skills/corply/references/authentication.md").includes("ChatGPT on the web"), "Missing ChatGPT OAuth guidance");
  check(read("skills/corply/references/formation.md").includes("newCompanyRequestId"), "Missing separate-company continuity");
  check(read("skills/corply/references/formation.md").includes("get_signature_request"), "Missing signature-email workflow");
  check(codex.interface.defaultPrompt.length <= 3, "Too many starter prompts");
  for (const [name, file] of toolReferences("submission/openai/skills")) {
    check(DIRECTORY_TOOLS.includes(name), file + " names a tool outside the directory inventory: " + name);
  }

  if (skipLive) {
    check(!submissionTargets.length, "Submission readiness requires live checks");
    console.log("Local plugin " + version + " checks complete; production not contacted.");
  } else {
    const endpoints = [
      ["plugin", process.env.CORPLY_PLUGIN_MCP_URL || PLUGIN_URL, generalFormation],
      ["directory", process.env.CORPLY_OPENAI_MCP_URL || DIRECTORY_URL, DIRECTORY_TOOLS],
    ];
    for (const [label, url, required] of endpoints) {
      const result = await rpc(url, "tools/list");
      const names = new Set(result.tools.map((tool) => tool.name));
      for (const name of required) check(names.has(name), label + " is missing required tool " + name);
      check(names.size === result.tools.length, label + " has duplicate tool names");
      const untitled = [];
      for (const tool of result.tools) {
        for (const annotation of ["readOnlyHint", "openWorldHint", "destructiveHint"]) {
          check(typeof tool.annotations?.[annotation] === "boolean", tool.name + " missing " + annotation);
        }
        check(tool.name.length <= 64, tool.name + " exceeds 64 characters");
        if (!tool.title && !tool.annotations?.title) untitled.push(tool.name);
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
      if (untitled.length) {
        const message = label + " has " + untitled.length + "/" + names.size + " tools without a title (Claude directory requires one): "
          + untitled.slice(0, 8).join(", ") + (untitled.length > 8 ? ", ..." : "");
        // Only the endpoint this plugin declares is submitted to the Claude directory.
        if (label === "plugin") block("anthropic", message);
        else console.log("Note: " + message);
      }
      const metadataUrl = "https://corply.dev/.well-known/oauth-protected-resource" + new URL(url).pathname;
      const auth = await fetch(url, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "whoami", arguments: {} } }),
        signal: AbortSignal.timeout(15000),
      });
      const denied = await auth.json();
      check(auth.status === 401, label + " unauthenticated identity read was not denied");
      check(auth.headers.get("www-authenticate")?.includes(metadataUrl), label + " tool auth advertises a different resource");
      check(denied.result?._meta?.["mcp/www_authenticate"]?.length > 0, label + " missing ChatGPT linking challenge");
      if (label === "directory") {
        for (const name of directoryExcluded) check(!names.has(name), "Directory capability changed: " + name);
        for (const name of upgrades) if (names.has(name)) block("openai", "Directory still exposes service checkout/upgrade tool " + name);
        check(JSON.stringify([...names].sort()) === JSON.stringify([...DIRECTORY_TOOLS].sort()),
          "Directory live inventory differs from the submitted snapshot");
        for (const tool of result.tools) {
          const expected = directoryInventory.find((entry) => entry.name === tool.name);
          check(tool.description === expected?.description && tool.title === expected?.title, "Directory metadata mismatch: " + tool.name);
          for (const hint of ["readOnlyHint", "destructiveHint", "openWorldHint", "idempotentHint"]) {
            check(tool.annotations?.[hint] === expected?.annotations?.[hint], "Directory annotation mismatch: " + tool.name + "." + hint);
          }
          check(!/Use checkoutUrl|curlExample/.test(tool.description), "Directory description exposes a purchase or terminal workflow: " + tool.name);
        }
        const general = new Set((await rpc(process.env.CORPLY_MCP_URL || REGISTRY_URL, "tools/list")).tools.map((tool) => tool.name));
        const dangling = new Map();
        for (const tool of result.tools) {
          for (const [word] of (tool.description || "").matchAll(/\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b/g)) {
            if (general.has(word) && !names.has(word)) dangling.set(word, [...(dangling.get(word) || []), tool.name]);
          }
        }
        for (const [word, tools] of dangling) {
          block("openai", "Directory descriptions name unexposed " + word + " (in " + [...new Set(tools)].join(", ") + ")");
        }
        const info = await rpc(url, "initialize", { protocolVersion: "2025-03-26",
          capabilities: {}, clientInfo: { name: "corply-plugin-contract-check", version } });
        check(info.serverInfo?.version === json("server.json").version, "MCP registry version differs from production");
        const probe = await fetch(url, { method: "POST", signal: AbortSignal.timeout(15000) });
        check(probe.status === 401, "Directory empty OAuth probe did not receive a challenge");
        check(probe.headers.get("www-authenticate")?.includes(metadataUrl), "Directory probe advertises a different resource");
      } else {
        for (const [name, file] of toolReferences("skills")) {
          check(names.has(name), file + " names a tool the plugin endpoint does not expose: " + name);
        }
        const financial = [...names].filter((name) => financeName.test(name));
        if (financial.length) console.log("The plugin endpoint still advertises non-formation tools: " + financial.join(", "));
        const moving = financial.filter((name) => moneyMovement.test(name));
        if (moving.length) {
          block("anthropic", "The endpoint the plugin declares exposes money-movement tools, which the Claude directory does not accept: "
            + moving.join(", "));
        }
      }
      console.log(label + ": " + names.size + " live tools; required contract checked.");
    }
  }
  if (submissionTargets.includes("openai")) {
    for (const message of reviewBlockers(json("submission/review-evidence.json"), directoryManifest.extensions["com.openai"].review)) {
      block("openai", message);
    }
  }
  for (const { target, message } of blockers) console.warn("Submission blocker [" + target + "]: " + message);
  errors.push(...blockers.filter(({ target }) => submissionTargets.includes(target)).map(({ target, message }) => target + ": " + message));
  assert.equal(errors.length, 0, errors.join("\n"));
  console.log("Plugin " + version + " " + (submissionTargets.length ? submissionTargets.join("+") + " submission readiness checks" : "live MCP contract checks") + " passed.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
