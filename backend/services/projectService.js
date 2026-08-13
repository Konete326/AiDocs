const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const subscriptionService = require('./subscriptionService');
const { checkAndRecoverProject } = require('./recoveryService');

exports.getUserProjects = async (userId, includeArchived = true) => {
  const query = { userId };
  if (!includeArchived) {
    query.isArchived = { $ne: true };
  }
  const projects = await Project.find(query).sort({ createdAt: -1 }).lean();
  return await Promise.all(projects.map(p => checkAndRecoverProject(p)));
};

exports.createProject = async (userId, data) => {
  await subscriptionService.checkProjectLimit(userId);
  
  const project = await Project.create({
    userId,
    ...data,
    status: 'draft'
  });
  
  return project;
};

const mongoose = require('mongoose');

exports.getProjectById = async (projectId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new AppError('Project not found', 404, 'NOT_FOUND');
  }
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false }).lean();
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  return await checkAndRecoverProject(project);
};

exports.updateProject = async (projectId, userId, data) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId, isArchived: false },
    data,
    { new: true, runValidators: true }
  ).lean();
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  if (data.designSystem) {
    const documentService = require('./documentService');
    await documentService.updateOrCreateDesignSystemDoc(projectId, userId, project);
  }

  return project;
};

exports.deleteProject = async (projectId, userId) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId, isArchived: false },
    { isArchived: true },
    { new: true }
  ).lean();
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  return project;
};

exports.archiveProject = async (projectId, userId) => {
  return exports.deleteProject(projectId, userId);
};

exports.unarchiveProject = async (projectId, userId) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId, isArchived: true },
    { isArchived: false },
    { new: true }
  ).lean();
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  return project;
};

exports.triggerGeneration = async (projectId, userId, force = false) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  project.status = 'generating';
  project.generationLock = new Date();
  if (force) {
    const stackDocTypes = ['techStack', 'folderStructure', 'claudeContext', 'agentSystemPrompt'];
    project.docsGenerated = (project.docsGenerated || []).filter(t => !stackDocTypes.includes(t));
  }
  await project.save();

  return project;
};

exports.resetProjectStatus = async (projectId, userId, targetStatus = 'error') => {
  const allowed = ['draft', 'error', 'complete'];
  const newStatus = allowed.includes(targetStatus) ? targetStatus : 'error';
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId, isArchived: false },
    { status: newStatus, generationLock: null },
    { new: true }
  ).lean();
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  return project;
};
