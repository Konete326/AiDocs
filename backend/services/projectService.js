const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const subscriptionService = require('./subscriptionService');

exports.getUserProjects = async (userId) => {
  return await Project.find({ userId, isArchived: false }).sort({ createdAt: -1 }).lean();
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

exports.getProjectById = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false }).lean();
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  return project;
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

exports.triggerGeneration = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  if (project.status !== 'generating') {
    project.status = 'generating';
  }
  project.generationLock = undefined;
  await project.save();

  return project;
};
