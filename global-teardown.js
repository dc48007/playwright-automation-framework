const fs = require('fs');
const pidFile = '.mcp-server-pid';
if (fs.existsSync(pidFile)) {
  const pid = Number(fs.readFileSync(pidFile, 'utf8'));
  try { process.kill(pid); } catch (e) { /* ignore - process may have exited */ }
  try { fs.unlinkSync(pidFile); } catch (e) { /* ignore */ }
}
