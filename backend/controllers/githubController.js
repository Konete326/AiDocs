const axios = require('axios');
const crypto = require('crypto');
const User = require('../models/User');
const Project = require('../models/Project');
const Document = require('../models/Document');
const { encryptToken, decryptToken } = require('../utils/cryptoUtils');
const githubService = require('../services/githubService');

exports.getConnectUrl = async (req, res) => {
  try {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) return res.status(400).json({ success: false, error: 'GITHUB_CLIENT_ID not configured' });
    const redirectUri = process.env.GITHUB_REDIRECT_URI || `${req.protocol}://${req.get('host')}/api/github/callback`;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo%20user`;
    res.status(200).json({ success: true, url });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.handleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).json({ success: false, error: 'Authorization code required' });

    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    }, { headers: { Accept: 'application/json' } });

    const accessToken = response.data.access_token;
    if (!accessToken) return res.status(400).json({ success: false, error: 'Failed to retrieve access token' });

    const ghUser = await githubService.getAuthenticatedUser(accessToken);
    const userId = req.user && (req.user.id || req.user._id);
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.github = { githubUsername: ghUser.username, githubAccessToken: encryptToken(accessToken), connectedAt: new Date(), scope: response.data.scope || 'repo' };
        await user.save();
      }
    }
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/settings?github=connected`);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const user = await User.findById(userId);
    if (!user || !user.github || !user.github.githubAccessToken) {
      return res.status(200).json({ success: true, isConnected: false });
    }
    res.status(200).json({ success: true, isConnected: true, username: user.github.githubUsername, connectedAt: user.github.connectedAt });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.saveTokenDirect = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ success: false, error: 'GitHub token required' });
    const ghUser = await githubService.getAuthenticatedUser(token);
    const userId = req.user.id || req.user._id;
    const user = await User.findById(userId);
    user.github = { githubUsername: ghUser.username, githubAccessToken: encryptToken(token), connectedAt: new Date(), scope: 'repo' };
    await user.save();
    res.status(200).json({ success: true, isConnected: true, username: ghUser.username, connectedAt: user.github.connectedAt });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Invalid GitHub token: ' + err.message });
  }
};

exports.disconnect = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const user = await User.findById(userId);
    if (user && user.github) {
      user.github = { githubUsername: null, githubAccessToken: null, connectedAt: null, scope: 'repo' };
      await user.save();
    }
    res.status(200).json({ success: true, isConnected: false });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.pushProjectSuite = async (req, res) => {
  try {
    const { projectId, repoName, isPrivate, commitMessage } = req.body;
    const userId = req.user.id || req.user._id;
    const user = await User.findById(userId);
    if (!user || !user.github || !user.github.githubAccessToken) {
      return res.status(400).json({ success: false, error: 'GitHub account not connected' });
    }

    const rawToken = decryptToken(user.github.githubAccessToken);
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });

    const docs = await Document.find({ projectId });
    if (!docs || docs.length === 0) return res.status(400).json({ success: false, error: 'No documents found' });

    const targetRepoName = repoName || project.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const { owner } = await githubService.createOrFetchRepo(rawToken, { repoName: targetRepoName, isPrivate: !!isPrivate, description: `Docs for ${project.title}` });

    const docNameMap = { prd: 'PRD.md', srd: 'SRD.md', techstack: 'TECH_STACK.md', dbschema: 'DB_SCHEMA.md', userflows: 'USER_FLOWS.md', mvpplan: 'MVP_PLAN.md', folderstructure: 'FOLDER_STRUCTURE.md', claudecontext: 'CLAUDE.md', systemprompts: 'SYSTEM_PROMPTS.md' };
    const documentsToPush = docs.map(d => ({ path: docNameMap[d.docType] || `${d.docType.toUpperCase()}.md`, content: d.content }));

    const result = await githubService.pushDocumentsToRepo(rawToken, { owner, repo: targetRepoName, commitMessage: commitMessage || 'Sync 9-Doc Suite via ClarifyAI', documents: documentsToPush });

    if (!project.webhookSecret) project.webhookSecret = crypto.randomBytes(16).toString('hex');
    const baseUrl = process.env.BACKEND_URL || process.env.VERCEL_URL || `${req.protocol}://${req.get('host')}`;
    const webhookRes = await githubService.createOrUpdateWebhook(rawToken, { owner, repo: targetRepoName, webhookUrl: `${baseUrl}/api/webhooks/github`, secret: project.webhookSecret });

    project.githubRepoUrl = result.repoUrl;
    project.githubRepoName = targetRepoName;
    project.lastPushedAt = result.pushedAt;
    if (webhookRes && webhookRes.webhookId) project.webhookId = webhookRes.webhookId;
    await project.save();

    res.status(200).json({ success: true, repoUrl: result.repoUrl, repoName: targetRepoName, lastPushedAt: result.pushedAt, commitSha: result.commitSha, webhookRegistered: !!webhookRes.webhookId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
