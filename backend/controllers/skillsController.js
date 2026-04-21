const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const Project = require('../models/Project');

const ALL_SKILLS = [
  // --- CORE & ESSENTIAL (All Projects) ---
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
    description: 'Create new skills, modify and improve existing skills, and measure skill performance.',
    command: 'npx skills add https://github.com/anthropics/skills --skill skill-creator',
    source: 'anthropics',
    forTypes: ['all'],
  },
  {
    id: 'clean-code',
    name: 'Clean Code',
    description: 'Expert-level patterns for writing maintainable, readable, and scalable code.',
    command: 'npx skills add https://github.com/sickn33/antigravity-awesome-skills --skill clean-code',
    source: 'sickn33',
    forTypes: ['all'],
  },
  {
    id: 'typescript-expert',
    name: 'TypeScript Expert',
    description: 'Advanced TypeScript patterns, type safety, and modern TS features.',
    command: 'npx skills add https://github.com/sickn33/antigravity-awesome-skills --skill typescript-expert',
    source: 'sickn33',
    forTypes: ['all'],
  },

  // --- MERN & FULLSTACK CORE ---
  {
    id: 'mern-patterns',
    name: 'MERN Patterns',
    description: 'Production-ready MERN stack patterns, folder structures, and state management.',
    command: 'npx skills add https://github.com/lobbi-docs/claude --skill mern-patterns',
    source: 'lobbi-docs',
    forTypes: ['saas', 'ecommerce', 'marketplace'],
  },
  {
    id: 'nodejs-best-practices',
    name: 'Node.js Best Practices',
    description: 'Deep dive into performance, security, and error handling in Node.js environments.',
    command: 'npx skills add https://github.com/sickn33/antigravity-awesome-skills --skill nodejs-best-practices',
    source: 'sickn33',
    forTypes: ['saas', 'ecommerce', 'marketplace'],
  },
  {
    id: 'mongodb-schema-design',
    name: 'MongoDB Schema',
    description: 'Expert MongoDB document modeling, indexing, and aggregation patterns.',
    command: 'npx skills add https://github.com/mongodb/agent-skills --skill mongodb-schema-design',
    source: 'mongodb',
    forTypes: ['saas', 'ecommerce', 'marketplace'],
  },

  // --- OPTIONAL / LIBRARY ONLY (No forTypes defaults) ---
  {
    id: 'supabase',
    name: 'Supabase Platform',
    description: 'Building modern apps with Supabase Auth, Database, Storage, and Edge Functions.',
    command: 'npx skills add https://github.com/supabase/agent-skills --skill supabase',
    source: 'supabase',
    forTypes: [], // Only via Library
  },
  {
    id: 'firebase-basics',
    name: 'Firebase Suite',
    description: 'Firestore, Authentication, and Hosting setup and management.',
    command: 'npx skills add https://github.com/firebase/agent-skills --skill firebase-basics',
    source: 'firebase',
    forTypes: [], // Only via Library
  },
  {
    id: 'nextjs',
    name: 'Next.js Expert',
    description: 'Optimizing App Router, Server Components, and Next.js performance.',
    command: 'npx skills add https://github.com/vercel-labs/vercel-plugin --skill nextjs',
    source: 'vercel',
    forTypes: [], // Only via Library
  },
  {
    id: 'microsoft-foundry',
    name: 'Azure Foundry',
    description: 'Microsoft Azure cloud patterns, deployment, and infrastructure-as-code.',
    command: 'npx skills add https://github.com/microsoft/azure-skills --skill microsoft-foundry',
    source: 'microsoft',
    forTypes: [], // Only via Library
  },

  // --- AI & AGENTS ---
  {
    id: 'agent-browser',
    name: 'Agent Browser',
    description: 'Teaches agent how to browse and interact with the web autonomously.',
    command: 'npx skills add https://github.com/vercel-labs/agent-browser --skill agent-browser',
    source: 'vercel',
    forTypes: ['all'],
  },
  {
    id: 'mcp-builder',
    name: 'MCP Builder',
    description: 'Build and optimize Model Context Protocol servers for AI integration.',
    command: 'npx skills add https://github.com/mcp-use/mcp-use --skill mcp-builder',
    source: 'mcp-use',
    forTypes: ['all'],
  },
  {
    id: 'find-skills',
    name: 'Find Skills',
    description: 'Utility for discovering and exploring new skills within the Vercel-Labs ecosystem.',
    command: 'npx skills add https://github.com/vercel-labs/skills --skill find-skills',
    source: 'vercel',
    forTypes: ['all'],
  }
];

exports.ALL_SKILLS = ALL_SKILLS;

exports.getProjectSkills = asyncWrapper(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  const skills = ALL_SKILLS.filter(s => {
    // 1. Must not be explicitly disabled
    if (project.disabledSkills && project.disabledSkills.includes(s.id)) return false;

    // 2. Must either be CORE, Project-Type specific, or Custom-Added
    return (
      s.forTypes.includes('all') || 
      s.forTypes.includes(project.projectType) ||
      (project.customSkills && project.customSkills.includes(s.id))
    );
  });

  res.json({ success: true, data: { skills, projectType: project.projectType, customSkills: project.customSkills || [] } });
});

exports.toggleProjectSkill = asyncWrapper(async (req, res) => {
  const { projectId } = req.params;
  const { skillId } = req.body;
  const userId = req.user.id;

  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  const isDefault = ALL_SKILLS.find(s => s.id === skillId && (s.forTypes.includes('all') || s.forTypes.includes(project.projectType)));

  if (isDefault) {
    // Toggling a default skill moves it in/out of disabledSkills
    if (!project.disabledSkills) project.disabledSkills = [];
    const isDisabled = project.disabledSkills.includes(skillId);
    if (isDisabled) {
      project.disabledSkills = project.disabledSkills.filter(id => id !== skillId);
    } else {
      project.disabledSkills.push(skillId);
    }
  } else {
    // Toggling a library skill moves it in/out of customSkills
    if (!project.customSkills) project.customSkills = [];
    const exists = project.customSkills.includes(skillId);
    if (exists) {
      project.customSkills = project.customSkills.filter(id => id !== skillId);
    } else {
      if (!ALL_SKILLS.find(s => s.id === skillId)) throw new AppError('Invalid skill ID', 400);
      project.customSkills.push(skillId);
    }
  }

  await project.save();
  
  const skills = ALL_SKILLS.filter(s => {
    if (project.disabledSkills && project.disabledSkills.includes(s.id)) return false;
    return (
      s.forTypes.includes('all') || 
      s.forTypes.includes(project.projectType) ||
      (project.customSkills && project.customSkills.includes(s.id))
    );
  });

  res.json({ success: true, data: { skills, customSkills: project.customSkills, disabledSkills: project.disabledSkills } });
});

exports.getAllAvailableSkills = async () => {
  return ALL_SKILLS;
};
