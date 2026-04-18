const projectService = require('../services/projectService');
const documentService = require('../services/documentService');
const asyncWrapper = require('../utils/asyncWrapper');
const subscriptionService = require('../services/subscriptionService');
const AppError = require('../utils/AppError');

// waitUntil keeps the Vercel serverless function alive after res.json() is called
let waitUntil;
try {
  ({ waitUntil } = require('@vercel/functions'));
} catch {
  // Fallback for local development — just run as a promise (Node.js keeps running)
  waitUntil = (p) => p;
}

exports.getAllProjects = asyncWrapper(async (req, res) => {
  const projects = await projectService.getUserProjects(req.user.id);
  res.status(200).json({ success: true, data: projects });
});

exports.createProject = asyncWrapper(async (req, res) => {
  const project = await projectService.createProject(req.user.id, req.body);
  res.status(201).json({ success: true, data: project });
});

exports.getProject = asyncWrapper(async (req, res) => {
  const project = await projectService.getProjectById(req.params.id, req.user.id);
  res.status(200).json({ success: true, data: project });
});

exports.updateProject = asyncWrapper(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.user.id, req.body);
  res.status(200).json({ success: true, data: project });
});

exports.deleteProject = asyncWrapper(async (req, res) => {
  await projectService.deleteProject(req.params.id, req.user.id);
  res.status(200).json({ success: true, data: {} });
});

exports.triggerGeneration = asyncWrapper(async (req, res) => {
  const projectId = req.params.id;
  const userId = req.user.id;

  // Set status to generating and respond immediately so the client can start polling
  const project = await projectService.triggerGeneration(projectId, userId);
  res.status(200).json({ success: true, data: project });

  // waitUntil keeps the Vercel function alive after res.json() so generation
  // is not killed the moment the HTTP response is flushed
  waitUntil(
    documentService.generateAll(projectId, userId)
      .catch(err => console.error('[triggerGeneration] generateAll failed:', err))
  );
});

