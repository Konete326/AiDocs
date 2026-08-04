const crypto = require('crypto');
const Project = require('../models/Project');
const Document = require('../models/Document');
const User = require('../models/User');
const { decryptToken } = require('../utils/cryptoUtils');
const githubService = require('./githubService');

const DOC_TYPE_MAP = {
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

function verifyGithubSignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

async function processGithubPush(payload) {
  if (!payload || !payload.repository) return { success: false, error: 'Invalid payload' };
  const repoName = payload.repository.name;
  const owner = payload.repository.owner.login || payload.repository.owner.name;

  const project = await Project.findOne({
    $or: [
      { githubRepoName: repoName },
      { githubRepoUrl: payload.repository.html_url }
    ]
  });

  if (!project) return { success: false, error: `No project found matching repo: ${repoName}` };

  const user = await User.findById(project.userId);
  const rawToken = user && user.github ? decryptToken(user.github.githubAccessToken) : null;

  const modifiedFiles = new Set();
  if (payload.commits && Array.isArray(payload.commits)) {
    payload.commits.forEach(c => {
      (c.modified || []).forEach(f => modifiedFiles.add(f));
      (c.added || []).forEach(f => modifiedFiles.add(f));
    });
  }

  const updatedDocs = [];
  for (const filePath of modifiedFiles) {
    const docType = DOC_TYPE_MAP[filePath];
    if (!docType) continue;

    let content = null;
    if (rawToken) {
      content = await githubService.fetchRawFileContent(rawToken, {
        owner,
        repo: repoName,
        path: filePath,
        branch: payload.repository.default_branch || 'main'
      });
    }

    if (content) {
      await Document.findOneAndUpdate(
        { projectId: project._id, docType },
        { content, updatedAt: new Date() },
        { upsert: true }
      );
      updatedDocs.push(filePath);
    }
  }

  project.lastSyncedFromGithubAt = new Date();
  await project.save();

  return {
    success: true,
    projectId: project._id,
    projectTitle: project.title,
    updatedDocs,
    syncedAt: project.lastSyncedFromGithubAt
  };
}

module.exports = {
  verifyGithubSignature,
  processGithubPush
};
