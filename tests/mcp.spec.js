const { test, expect } = require('@playwright/test');
const WebSocket = require('ws');

test('connect to MCP server via WebSocket', async () => {
  const ws = new WebSocket('ws://localhost:4000/mcp');

  await new Promise((resolve, reject) => {
    ws.on('open', resolve);
    ws.on('error', reject);
  });

  const greeting = await new Promise((resolve) => {
    ws.on('message', (m) => resolve(JSON.parse(m)));
  });

  expect(greeting.hello).toBe('from mcp-server');

  ws.send(JSON.stringify({ type: 'test-ready', payload: { test: 'mcp.spec' } }));

  ws.close();
});
