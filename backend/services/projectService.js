const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const subscriptionService = require('./subscriptionService');

exports.getUserProjects = async (userId) => {
  return await Project.find({ userId, isArchived: false }).sort({ createdAt: -1 });
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
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  
  if (project.status === 'generating') {
    const lockedProject = await Project.findOneAndUpdate(
      { 
        _id: projectId, 
        userId,
        status: 'generating', 
        $or: [ 
          { generationLock: null }, 
          { generationLock: { $lt: new Date(Date.now() - 45000) } } 
        ] 
      },
      { generationLock: new Date() },
      { new: true }
    );
    
    if (lockedProject) {
      try {
        const documentService = require('./documentService');
        await documentService.generateNext(projectId, userId);
      } catch (err) {
        console.error('[getProjectById] incremental generation failed:', err);
      } finally {
        await Project.findByIdAndUpdate(projectId, { $unset: { generationLock: 1 } });
      }
      return await Project.findOne({ _id: projectId, userId, isArchived: false });
    }
  }
  
  return project;
};

exports.updateProject = async (projectId, userId, data) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId, isArchived: false },
    data,
    { new: true, runValidators: true }
  );
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  return project;
};

exports.deleteProject = async (projectId, userId) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, userId, isArchived: false },
    { isArchived: true },
    { new: true }
  );
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
