const Project = require('../models/Project');
const Document = require('../models/Document');

const REQUIRED_DOC_TYPES = [
  'prd', 'srd', 'techStack', 'dbSchema', 'userFlows',
  'mvpPlan', 'folderStructure', 'claudeContext', 'agentSystemPrompt'
];

const STUCK_TIMEOUT_MS = 5 * 60 * 1000;

const checkAndRecoverProject = async (project) => {
  if (!project || project.status !== 'generating') return project;

  const existingDocs = await Document.find({ projectId: project._id });
  const completedTypes = new Set(existingDocs.filter(d => Boolean(d.content)).map(d => d.docType));

  const hasAllRequiredDocs = REQUIRED_DOC_TYPES.every(type => completedTypes.has(type));

  if (hasAllRequiredDocs) {
    const updated = await Project.findByIdAndUpdate(
      project._id,
      { status: 'complete', docsGenerated: Array.from(completedTypes) },
      { new: true }
    ).lean();
    return updated || project;
  }

  const updatedAtMs = new Date(project.updatedAt).getTime();
  const isTimedOut = (Date.now() - updatedAtMs) > STUCK_TIMEOUT_MS;

  if (isTimedOut) {
    const updated = await Project.findByIdAndUpdate(
      project._id,
      { status: 'error' },
      { new: true }
    ).lean();
    return updated || project;
  }

  return project;
};

const recoverAllStuckProjects = async () => {
  try {
    const stuckProjects = await Project.find({ status: 'generating', isArchived: false });
    for (const project of stuckProjects) {
      await checkAndRecoverProject(project);
    }
  } catch (err) {
    console.error('Recovery failed:', err.message);
  }
};

module.exports = {
  checkAndRecoverProject,
  recoverAllStuckProjects
};
