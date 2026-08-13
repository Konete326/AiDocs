const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;
const UIComponent = require('../models/UIComponent');

const activeWatchers = new Map();
const debounceTimers = new Map();

const syncWorkspaceToDb = async (componentId, workspacePath) => {
  try {
    const htmlPath = path.join(workspacePath, 'index.html');
    const cssPath = path.join(workspacePath, 'styles.css');

    let htmlContent = '';
    let cssContent = '';

    try {
      htmlContent = await fsp.readFile(htmlPath, 'utf8');
    } catch {}

    try {
      cssContent = await fsp.readFile(cssPath, 'utf8');
    } catch {}

    await UIComponent.findByIdAndUpdate(componentId, {
      'code.html': htmlContent,
      'code.css': cssContent,
      'code.react': htmlContent,
      'code.tailwind': htmlContent
    });
  } catch (err) {
    console.error(`Error syncing workspace ${componentId} to DB:`, err.message);
  }
};

const startWorkspaceWatcher = (componentId, workspacePath) => {
  const compIdStr = String(componentId);
  stopWorkspaceWatcher(compIdStr);

  try {
    const watcher = fs.watch(workspacePath, (eventType, filename) => {
      if (!filename || (filename !== 'index.html' && filename !== 'styles.css')) {
        return;
      }

      if (debounceTimers.has(compIdStr)) {
        clearTimeout(debounceTimers.get(compIdStr));
      }

      const timer = setTimeout(() => {
        debounceTimers.delete(compIdStr);
        syncWorkspaceToDb(compIdStr, workspacePath);
      }, 500);

      debounceTimers.set(compIdStr, timer);
    });

    activeWatchers.set(compIdStr, watcher);
  } catch (err) {
    console.error(`Failed to start watcher for ${componentId}:`, err.message);
  }
};

const stopWorkspaceWatcher = (componentId) => {
  const compIdStr = String(componentId);
  if (debounceTimers.has(compIdStr)) {
    clearTimeout(debounceTimers.get(compIdStr));
    debounceTimers.delete(compIdStr);
  }
  if (activeWatchers.has(compIdStr)) {
    try {
      activeWatchers.get(compIdStr).close();
    } catch {}
    activeWatchers.delete(compIdStr);
  }
};

const stopAllWatchers = () => {
  for (const [id] of activeWatchers) {
    stopWorkspaceWatcher(id);
  }
};

process.on('SIGINT', stopAllWatchers);
process.on('SIGTERM', stopAllWatchers);
process.on('exit', stopAllWatchers);

module.exports = {
  startWorkspaceWatcher,
  stopWorkspaceWatcher,
  stopAllWatchers
};
