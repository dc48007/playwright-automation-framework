# Playwright Automation Framework

This repository contains Playwright-based tests and a minimal local MCP-style server used for e2e coordination.

Quick links
- Project setup: `docs/md/setup.md`
- MCP integration: `docs/md/mcp-integration.md`

Getting started

1. Install Node via `nvm` (see `docs/md/setup.md`).
2. Install dependencies:

```powershell
npm install
npx playwright install
```

3. To run the MCP server locally:

```powershell
npm run mcp-server
```

4. Run the example test (in a separate terminal):

```powershell
npx playwright test tests/mcp.spec.js
```

Run E2E (starts server, waits for `/status`, then runs test):

```powershell
npm run test:e2e
```

CI

See `.github/workflows/e2e.yml` for an example GitHub Actions job that starts the MCP server and runs Playwright tests.
