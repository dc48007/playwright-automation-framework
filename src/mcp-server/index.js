const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/status', (req, res) => res.json({ ok: true }));

app.post('/broadcast', (req, res) => {
  const payload = req.body || {};
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    }
  });
  res.json({ sent: true, clients: wss.clients.size });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/mcp' });

wss.on('connection', (ws) => {
  console.log('MCP client connected');
  ws.on('message', (message) => {
    console.log('Received from client:', message.toString());
  });
  ws.send(JSON.stringify({ hello: 'from mcp-server' }));
});

const PORT = process.env.MCP_PORT || 4000;
server.listen(PORT, () => console.log(`MCP server listening on ${PORT}`));
