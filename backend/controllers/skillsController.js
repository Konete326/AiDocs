const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const Project = require('../models/Project');

const ALL_SKILLS = [
  {
    id: 'frontend-design',
    name: 'Frontend Design',
    description: 'Teaches agent how to build distinctive, production-grade UIs with proper aesthetics.',
    command: 'npx skills add https://github.com/anthropics/skills --skill frontend-design',
    source: 'anthropics',
    forTypes: ['all'],
  },
  {
    id: 'skill-creator',
    name: 'Skill Creator',
    description: 'Teaches agent how to create and optimize new skills for any project.',
    command: 'npx skills add https://github.com/anthropics/skills --skill skill-creator',
    source: 'anthropics',
    forTypes: ['all'],
  },
  {
    id: 'find-skills',
    name: 'Find Skills',
    description: 'Teaches agent how to discover and use available skills effectively.',
    command: 'npx skills add https://github.com/vercel-labs/skills --skill find-skills',
    source: 'vercel-labs',
    forTypes: ['all'],
  },
  {
    id: 'docx',
    name: 'DOCX Generator',
    description: 'Teaches agent to create and manipulate Word documents programmatically.',
    command: 'npx skills add https://github.com/anthropics/skills --skill docx',
    source: 'anthropics',
    forTypes: ['saas', 'ecommerce', 'marketplace', 'other'],
  },
  {
    id: 'pdf',
    name: 'PDF Generator',
    description: 'Teaches agent to generate, read and fill PDF documents.',
    command: 'npx skills add https://github.com/anthropics/skills --skill pdf',
    source: 'anthropics',
    forTypes: ['saas', 'ecommerce', 'marketplace', 'other'],
  },
  {
    id: 'xlsx',
    name: 'XLSX Generator',
    description: 'Teaches agent to create Excel spreadsheets programmatically.',
    command: 'npx skills add https://github.com/anthropics/skills --skill xlsx',
    source: 'anthropics',
    forTypes: ['saas'],
  },
  {
    id: 'mobile',
    name: 'Flutter Mobile',
    description: 'Best practices for Flutter app development — state management, navigation, and platform patterns.',
    command: 'npx skills add https://github.com/anthropics/skills --skill mobile',
    source: 'anthropics',
    forTypes: ['mobile'],
  },
  {
    id: 'claude-api',
    name: 'Claude API',
    description: 'Teaches agent how to integrate and use the Anthropic Claude API effectively.',
    command: 'npx skills add https://github.com/anthropics/skills --skill claude-api',
    source: 'anthropics',
    forTypes: ['ai'],
  },
];

exports.getProjectSkills = asyncWrapper(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  const skills = ALL_SKILLS.filter(s =>
    s.forTypes.includes('all') || s.forTypes.includes(project.projectType)
  );

  res.json({ success: true, data: { skills, projectType: project.projectType } });
});
