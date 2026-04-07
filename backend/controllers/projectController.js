const projectService = require('../services/projectService');
const asyncWrapper = require('../utils/asyncWrapper');

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
  const project = await projectService.triggerGeneration(req.params.id, req.user.id);
  res.status(200).json({ success: true, data: project });
});
