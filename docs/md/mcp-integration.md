# Integrating a local MCP-style server with Playwright

This document explains how to install and connect a simple MCP-style server (HTTP + WebSocket) to your Playwright tests. "MCP" here is used generically to mean a small server that provides model/context data or coordinates test flows via HTTP and WebSocket APIs.

**What you'll get**
- A minimal Node-based MCP server you can run locally.
- How to install required dependencies and start the server.
- Example Playwright test that connects to the server (via Node-side WebSocket).
- Notes for running in CI and connecting from browser contexts.


## Prerequisites
- Follow `docs/md/setup.md` to install `nvm` and pick a Node version (e.g., `18.17.1`).
- Ensure your repo has Playwright test runner installed:

```powershell
npm install -D @playwright/test
npx playwright install
```


## Install server dependencies

Create a small server folder (optional): `src/mcp-server` and install dependencies in the repo root:

```powershell
npm install express ws cors morgan
```

(If you prefer a scoped `package.json` inside `src/mcp-server`, you can `cd` into that folder and `npm init -y` then install there.)


## Minimal MCP server (Node + Express + WebSocket)

Create `src/mcp-server/index.js` with the following code (example):

```js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(express.json());

app.get('/status', (req, res) => res.json({ ok: true }));

// An HTTP endpoint that broadcasts a message to connected WS clients
app.post('/broadcast', (req, res) => {
  const payload = req.body;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    }
  });
  res.json({ sent: true });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/mcp' });

wss.on('connection', (ws) => {
  console.log('MCP client connected');
  ws.on('message', (message) => {
    console.log('Received from client:', message);
  });
  ws.send(JSON.stringify({ hello: 'from mcp-server' }));
});

const PORT = process.env.MCP_PORT || 4000;
server.listen(PORT, () => console.log(`MCP server listening on ${PORT}`));
```

Add an `npm` script to start the server in your `package.json` (repo root):

```json
"scripts": {
  "mcp-server": "node src/mcp-server/index.js"
}
```

Start the server in a terminal:

```powershell
npm run mcp-server
```


## Playwright test — connect via WebSocket (Node-side)

Playwright test files run in Node, so it's straightforward to open a WebSocket connection from the test code. Example test `tests/mcp.spec.js`:

```js
const { test, expect } = require('@playwright/test');
const WebSocket = require('ws');

test('connect to MCP server via WebSocket', async () => {
  const ws = new WebSocket('ws://localhost:4000/mcp');

  await new Promise((resolve, reject) => {
    ws.on('open', () => resolve());
    ws.on('error', (err) => reject(err));
  });

  // Wait for a greeting from the server
  const greeting = await new Promise((resolve) => {
    ws.on('message', (m) => resolve(JSON.parse(m)));
  });

  expect(greeting.hello).toBe('from mcp-server');

  // Send a message to the server
  ws.send(JSON.stringify({ type: 'test-ready', payload: { test: 'mcp.spec' } }));

  ws.close();
});
```

Run the test with the server running in another terminal:

```powershell
npm run mcp-server
# in a separate terminal
npx playwright test tests/mcp.spec.js
```


## Connecting from the browser context (optional)

If you need the page itself to open a WebSocket connection (e.g., page.evaluate or client-side code), make sure:
- The WebSocket server is reachable from the browser environment (use correct host/port).
- If you run tests in a browser with remote origins, configure CORS and network access accordingly.

Example to create a WebSocket from the page context:

```js
await page.evaluate(() => {
  const ws = new WebSocket('ws://localhost:4000/mcp');
  ws.addEventListener('message', (e) => console.log('page received', e.data));
  // send an initial message from the page
  ws.addEventListener('open', () => ws.send(JSON.stringify({ from: 'page' })));
});
```

Note: running WebSocket from the page may require the page environment to allow connecting to `localhost:4000`; when running tests in CI or containers, ensure networking is configured.


## Running in CI

- Start the MCP server as a background service in your CI job. Examples:
  - GitHub Actions: use a step to `node src/mcp-server/index.js &` or use `pm2`, or run `npm run mcp-server` in the background.
  - Use `start-server-and-test` or `wait-on` to ensure the server is ready before running Playwright tests.

Example `package.json` scripts using `start-server-and-test` (install it first):

```json
"scripts": {
  "mcp-server": "node src/mcp-server/index.js",
  "test:e2e": "start-server-and-test 'npm run mcp-server' http-get://localhost:4000/status 'npx playwright test'"
}
```


## Summary & recommendations
- Use Node-side WebSocket connections from Playwright tests for simplicity and reliability.
- Keep the MCP server small and stateless where possible; use HTTP endpoints to seed state and WebSocket to notify tests.
- For CI, ensure the server is started and healthy before running tests (`/status` endpoint helps).


---
If you want, I can:
- Scaffold the `src/mcp-server/index.js` file and an example test `tests/mcp.spec.js` in your repo now.
- Add scripts to `package.json` for `mcp-server` and a `test:e2e` helper using `start-server-and-test`.

Tell me which of those you'd like me to create and I will add them.