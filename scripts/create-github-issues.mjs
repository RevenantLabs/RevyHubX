import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const issuesPath = join(repoRoot, "docs", "ISSUES.md");
const defaultRepo = "STELLAR-HOUSE/stellar-devtools-hub";
const repo = process.env.GITHUB_REPOSITORY || process.env.GH_REPO || defaultRepo;
const dryRun = process.argv.includes("--dry-run");

function runGh(args, options = {}) {
  return execFileSync("gh", args, {
    encoding: "utf8",
    stdio: options.stdio ?? ["ignore", "pipe", "pipe"]
  }).trim();
}

function assertGhReady() {
  const version = spawnSync("gh", ["--version"], { encoding: "utf8" });

  if (version.status !== 0) {
    throw new Error("GitHub CLI is not installed. Install gh first: https://cli.github.com/");
  }

  const auth = spawnSync("gh", ["auth", "status"], { encoding: "utf8" });

  if (auth.status !== 0) {
    throw new Error("GitHub CLI is not authenticated. Run: gh auth login");
  }
}

function getSectionValue(section, heading) {
  const pattern = new RegExp(`### ${heading}\\n\\n([\\s\\S]*?)(?=\\n### |\\n## Issue |$)`);
  const match = section.match(pattern);
  return match?.[1]?.trim() ?? "";
}

function parseIssues(markdown) {
  const sections = markdown.split(/\n## Issue /).slice(1);

  return sections.map((section) => {
    const issueNumber = Number(section.match(/^(\d+)/)?.[1]);
    const title = getSectionValue(section, "Title");
    const type = getSectionValue(section, "Type");
    const difficulty = getSectionValue(section, "Difficulty");
    const description = getSectionValue(section, "Description");
    const acceptanceCriteria = getSectionValue(section, "Acceptance Criteria");

    if (!issueNumber || !title || !type || !difficulty || !description) {
      throw new Error(`Could not parse issue block: ${section.slice(0, 80)}...`);
    }

    return {
      issueNumber,
      title,
      type,
      difficulty,
      description,
      acceptanceCriteria
    };
  });
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function labelsForIssue(issue) {
  const labels = new Set([`difficulty:${slug(issue.difficulty)}`]);
  const type = issue.type.toLowerCase();

  if (type.includes("frontend") || type.includes("ui") || type.includes("ux")) labels.add("area:frontend");
  if (type.includes("stellar") || type.includes("testnet")) labels.add("area:stellar");
  if (type.includes("wallet")) labels.add("area:wallet");
  if (type.includes("documentation")) labels.add("area:docs");
  if (type.includes("testing")) labels.add("area:testing");
  if (type.includes("developer experience")) labels.add("area:dx");
  if (type.includes("qr")) labels.add("area:qr");

  return [...labels];
}

function bodyForIssue(issue) {
  return [
    `Source roadmap item: Issue #${issue.issueNumber} in \`docs/ISSUES.md\`.`,
    "",
    "## Type",
    issue.type,
    "",
    "## Difficulty",
    issue.difficulty,
    "",
    "## Description",
    issue.description,
    "",
    "## Acceptance Criteria",
    issue.acceptanceCriteria,
    "",
    "## Contributor Notes",
    `- Search the codebase for \`TODO(issue #${issue.issueNumber})\` before starting.`,
    "- Keep the anthropomorphic UI theme consistent.",
    "- Run `npm run lint` and `npm run build` before opening a pull request."
  ].join("\n");
}

function existingIssueTitles() {
  const output = runGh([
    "issue",
    "list",
    "--repo",
    repo,
    "--state",
    "all",
    "--limit",
    "1000",
    "--json",
    "title"
  ]);
  return new Set(JSON.parse(output).map((issue) => issue.title));
}

function ensureLabel(label) {
  const color = label.startsWith("difficulty:")
    ? label.endsWith("advanced")
      ? "b60205"
      : "fbca04"
    : "1d76db";

  const result = spawnSync(
    "gh",
    ["label", "create", label, "--repo", repo, "--color", color, "--force"],
    { encoding: "utf8" }
  );

  if (result.status !== 0) {
    throw new Error(`Could not create or update label "${label}": ${result.stderr}`);
  }
}

function createIssue(issue, labels) {
  runGh(
    [
      "issue",
      "create",
      "--repo",
      repo,
      "--title",
      issue.title,
      "--body",
      bodyForIssue(issue),
      ...labels.flatMap((label) => ["--label", label])
    ],
    { stdio: "inherit" }
  );
}

const markdown = readFileSync(issuesPath, "utf8");
const issues = parseIssues(markdown);

console.log(`Parsed ${issues.length} issues from docs/ISSUES.md.`);
console.log(`Target repository: ${repo}`);

if (dryRun) {
  for (const issue of issues) {
    console.log(`[dry-run] #${issue.issueNumber} ${issue.title}`);
    console.log(`          labels: ${labelsForIssue(issue).join(", ")}`);
  }
  process.exit(0);
}

assertGhReady();

const existingTitles = existingIssueTitles();

for (const issue of issues) {
  if (existingTitles.has(issue.title)) {
    console.log(`Skipping existing issue: ${issue.title}`);
    continue;
  }

  const labels = labelsForIssue(issue);
  labels.forEach(ensureLabel);
  console.log(`Creating issue #${issue.issueNumber}: ${issue.title}`);
  createIssue(issue, labels);
}

console.log("Issue creation complete.");
