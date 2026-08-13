const net = require('net');
const path = require('path');
const { spawn } = require('child_process');
const { startFallbackServer } = require('./vscodeFallbackServer');

const PORT = parseInt(process.env.VSCODE_PORT || '8080', 10);
const EXT_DIR = path.resolve(__dirname, '../../vscode-extension');
let serverProcess = null;
let isSpawning = false;

const isPortActive = (port) => new Promise((resolve) => {
  const socket = net.createConnection({ port, host: '127.0.0.1' }, () => {
    socket.destroy();
    resolve(true);
  });
  socket.on('error', () => resolve(false));
  socket.setTimeout(300, () => {
    socket.destroy();
    resolve(false);
  });
});

const killCodeServer = () => {
  if (!serverProcess) return;
  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(serverProcess.pid), '/f', '/t'], { stdio: 'ignore' });
    } else {
      process.kill(-serverProcess.pid, 'SIGTERM');
    }
  } catch {}
  serverProcess = null;
};

const ensureCodeServerRunning = async () => {
  if (await isPortActive(PORT)) {
    return true;
  }

  if (isSpawning) {
    await startFallbackServer(PORT);
    return true;
  }

  isSpawning = true;
  try {
    await startFallbackServer(PORT);

    const isWin = process.platform === 'win32';
    const cmd = isWin ? 'cmd.exe' : 'npx';
    const args = isWin
      ? ['/c', 'npx', '-y', 'code-server', '--auth', 'none', '--bind-addr', `0.0.0.0:${PORT}`, '--disable-telemetry', '--extra-extensions-dir', EXT_DIR]
      : ['-y', 'code-server', '--auth', 'none', '--bind-addr', `0.0.0.0:${PORT}`, '--disable-telemetry', '--extra-extensions-dir', EXT_DIR];

    try {
      serverProcess = spawn(cmd, args, { stdio: 'ignore', detached: !isWin });
      serverProcess.on('error', () => { serverProcess = null; });
      serverProcess.on('exit', () => { serverProcess = null; });
    } catch {}

    return true;
  } catch {
    await startFallbackServer(PORT);
    return true;
  } finally {
    isSpawning = false;
  }
};

process.on('SIGINT', killCodeServer);
process.on('SIGTERM', killCodeServer);
process.on('exit', killCodeServer);

module.exports = {
  isPortActive,
  ensureCodeServerRunning,
  killCodeServer
};
