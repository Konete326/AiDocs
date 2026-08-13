const UIComponent = require('../models/UIComponent');
const { initializeWorkspace } = require('../services/vscodeWorkspaceService');
const { startWorkspaceWatcher } = require('../services/vscodeWorkspaceWatcher');
const { purgeWorkspace } = require('../services/vscodeCleanupService');
const { ensureCodeServerRunning } = require('../services/codeServerManager');

const VSCODE_PORT = process.env.VSCODE_PORT || '8080';
const VSCODE_HOST = process.env.VSCODE_SERVER_URL || `http://localhost:${VSCODE_PORT}`;

const createWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const component = await UIComponent.findById(id);
    if (!component) {
      return res.status(404).json({ success: false, error: 'UI Component not found' });
    }

    const currentUserId = (req.user._id || req.user.id).toString();
    const creatorId = (component.creator._id || component.creator).toString();
    if (creatorId !== currentUserId) {
      return res.status(403).json({ success: false, error: 'Unauthorized component owner' });
    }

    await ensureCodeServerRunning();

    const workspacePath = await initializeWorkspace(id, component);
    startWorkspaceWatcher(id, workspacePath);

    const formattedPath = workspacePath.replace(/\\/g, '/');
    const sessionUrl = `${VSCODE_HOST}/?folder=${encodeURIComponent(formattedPath)}`;

    return res.status(200).json({
      success: true,
      data: {
        workspacePath,
        sessionUrl,
        title: component.title
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Failed to initialize VS Code workspace',
      details: err.message
    });
  }
};

const destroyWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const component = await UIComponent.findById(id);
    if (!component) {
      return res.status(404).json({ success: false, error: 'UI Component not found' });
    }

    const currentUserId = (req.user._id || req.user.id).toString();
    const creatorId = (component.creator._id || component.creator).toString();
    if (creatorId !== currentUserId) {
      return res.status(403).json({ success: false, error: 'Unauthorized component owner' });
    }

    await purgeWorkspace(id);
    return res.status(200).json({
      success: true,
      message: 'Workspace destroyed successfully'
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Failed to destroy VS Code workspace',
      details: err.message
    });
  }
};

module.exports = {
  createWorkspace,
  destroyWorkspace
};
