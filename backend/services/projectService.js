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

  // If already generating, just resume — don't reset
  if (project.status !== 'generating') {
    project.status = 'generating';
    await project.save();
  }

  return project;
};

exports.exportProjectAsZip = async (projectId, userId, res) => {
  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  
  if (project.status !== 'complete') {
    throw new AppError('Project generation is not complete yet', 400, 'PROJECT_NOT_READY');
  }

  const Document = require('../models/Document');
  const documents = await Document.find({ projectId });
  
  const archiver = require('archiver');
  const archive = archiver('zip', { zlib: { level: 9 } });

  res.attachment(`${project.title.replace(/\s+/g, '_')}_AiDocs.zip`);
  archive.pipe(res);

  for (const doc of documents) {
    const filename = `${doc.docType.toUpperCase()}.md`;
    archive.append(doc.content, { name: filename });
  }

  await archive.finalize();
};
