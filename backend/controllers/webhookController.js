const crypto = require('crypto');
const Project = require('../models/Project');
const Document = require('../models/Document');
const User = require('../models/User');
const { decryptToken } = require('../utils/cryptoUtils');
const githubService = require('../services/githubService');
const webhookService = require('../services/webhookService');

exports.handleGithubWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-hub-signature-256'];
    const event = req.headers['x-github-event'];
    if (event !== 'push') {
      return res.status(200).json({ success: true, message: `Event ${event} ignored` });
    }

    const payload = req.body;
    if (!payload || !payload.repository) {
      return res.status(400).json({ success: false, error: 'Invalid payload format' });
    }

    const repoName = payload.repository.name;
    const project = await Project.findOne({
      $or: [{ githubRepoName: repoName }, { githubRepoUrl: payload.repository.html_url }]
    });

    if (project && project.webhookSecret && signature) {
      const rawBody = req.rawBody || JSON.stringify(payload);
      const isValid = webhookService.verifyGithubSignature(rawBody, signature, project.webhookSecret);
      if (!isValid) {
        return res.status(401).json({ success: false, error: 'Invalid HMAC signature' });
      }
    }

    const result = await webhookService.processGithubPush(payload);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.triggerManualSync = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id || req.user._id;
    const project = await Project.findById(projectId);

    if (!project || String(project.userId) !== String(userId)) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    if (!project.githubRepoName) {
      return res.status(400).json({ success: false, error: 'Project is not linked to a GitHub repository' });
    }

    const user = await User.findById(userId);
    if (!user || !user.github || !user.github.githubAccessToken) {
      return res.status(400).json({ success: false, error: 'GitHub account not connected' });
    }

    const rawToken = decryptToken(user.github.githubAccessToken);
    const owner = user.github.githubUsername;

    const docNameMap = {
      'PRD.md': 'prd',
      'SRD.md': 'srd',
      'TECH_STACK.md': 'techstack',
      'DB_SCHEMA.md': 'dbschema',
      'USER_FLOWS.md': 'userflows',
      'MVP_PLAN.md': 'mvpplan',
      'FOLDER_STRUCTURE.md': 'folderstructure',
      'CLAUDE.md': 'claudecontext',
      'SYSTEM_PROMPTS.md': 'systemprompts'
    };

    const syncedDocs = [];
    for (const [fileName, docType] of Object.entries(docNameMap)) {
      const content = await githubService.fetchRawFileContent(rawToken, {
        owner,
        repo: project.githubRepoName,
        path: fileName
      });

      if (content) {
        await Document.findOneAndUpdate(
          { projectId: project._id, docType },
          { content, updatedAt: new Date() },
          { upsert: true }
        );
        syncedDocs.push(fileName);
      }
    }

    project.lastSyncedFromGithubAt = new Date();
    await project.save();

    res.status(200).json({
      success: true,
      syncedDocs,
      syncedAt: project.lastSyncedFromGithubAt
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
