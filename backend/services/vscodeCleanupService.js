const path = require('path');
const fs = require('fs').promises;
const { stopWorkspaceWatcher } = require('./vscodeWorkspaceWatcher');

const WORKSPACES_ROOT = path.resolve(__dirname, '..', 'workspaces');
const STALE_THRESHOLD_MS = 24 * 60 * 60 * 1000;

const purgeWorkspace = async (componentId) => {
  const compIdStr = String(componentId);
  stopWorkspaceWatcher(compIdStr);

  const workspacePath = path.join(WORKSPACES_ROOT, compIdStr);
  try {
    await fs.rm(workspacePath, { recursive: true, force: true });
  } catch (err) {
    console.error(`Failed to purge workspace ${compIdStr}:`, err.message);
  }
};

const cleanupStaleWorkspaces = async () => {
  try {
    await fs.mkdir(WORKSPACES_ROOT, { recursive: true });
    const entries = await fs.readdir(WORKSPACES_ROOT, { withFileTypes: true });
    const now = Date.now();

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const dirPath = path.join(WORKSPACES_ROOT, entry.name);
        try {
          const stats = await fs.stat(dirPath);
          if (now - stats.mtimeMs > STALE_THRESHOLD_MS) {
            await purgeWorkspace(entry.name);
          }
        } catch {}
      }
    }
  } catch (err) {
    console.error('Error during stale workspace cleanup:', err.message);
  }
};

const startCleanupScheduler = () => {
  cleanupStaleWorkspaces();
  setInterval(cleanupStaleWorkspaces, 6 * 60 * 60 * 1000);
};

module.exports = {
  purgeWorkspace,
  cleanupStaleWorkspaces,
  startCleanupScheduler
};
