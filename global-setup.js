const { spawn } = require('child_process');
const net = require('net');
const fs = require('fs');

function waitForPort(host, port, timeout = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function check() {
      const sock = net.createConnection(port, host);
      sock.on('connect', () => { sock.end(); resolve(); });
      sock.on('error', () => {
        if (Date.now() - start > timeout) return reject(new Error('timeout waiting for port'));
        setTimeout(check, 200);
      });
    })();
  });
}

module.exports = async () => {
  // Use npx to run the official Playwright MCP server.
  // We run it headless on port 8931 and record the PID for teardown.
  const port = process.env.MCP_PORT || 8931;
  const args = ['@playwright/mcp@latest', '--port', String(port), '--headless'];
  const opts = { stdio: ['ignore', 'inherit', 'inherit'], shell: process.platform === 'win32' };
  const proc = spawn('npx', args, opts);

  // Persist PID so teardown can stop it.
  fs.writeFileSync('.mcp-server-pid', String(proc.pid), 'utf8');

  // Wait until the server responds on the status endpoint.
  await waitForPort('127.0.0.1', port, 20000);

  // Expose MCP URL for tests via env.
  process.env.PLAYWRIGHT_MCP_URL = `http://127.0.0.1:${port}/mcp`;
};
