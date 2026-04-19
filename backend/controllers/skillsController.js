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
  {
    id: 'structured-autonomy-plan',
    name: 'Structured Autonomy',
    description: 'Planning and execution strategies for autonomous AI agents in complex environments.',
    command: 'npx skills add https://github.com/github/awesome-copilot --skill structured-autonomy-plan',
    source: 'github',
    forTypes: ['all'],
  },
  {
    id: 'folder-structure-blueprint-generator',
    name: 'Folder Blueprint',
    description: 'Generates optimized folder structures and architecture blueprints for any project.',
    command: 'npx skills add https://github.com/github/awesome-copilot --skill folder-structure-blueprint-generator',
    source: 'github',
    forTypes: ['all'],
  },

  // --- MERN & FULLSTACK (SaaS, Ecommerce, Marketplace) ---
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
    id: 'nodejs-express-server',
    name: 'Express Server',
    description: 'Boilerplate and best practices for high-performance Express.js servers.',
    command: 'npx skills add https://github.com/aj-geddes/useful-ai-prompts --skill nodejs-express-server',
    source: 'aj-geddes',
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
  {
    id: 'supabase',
    name: 'Supabase Platform',
    description: 'Building modern apps with Supabase Auth, Database, Storage, and Edge Functions.',
    command: 'npx skills add https://github.com/supabase/agent-skills --skill supabase',
    source: 'supabase',
    forTypes: ['saas', 'ecommerce', 'marketplace'],
  },
  {
    id: 'nextjs',
    name: 'Next.js Expert',
    description: 'Optimizing App Router, Server Components, and Next.js performance.',
    command: 'npx skills add https://github.com/vercel-labs/vercel-plugin --skill nextjs',
    source: 'vercel',
    forTypes: ['saas', 'ecommerce', 'marketplace'],
  },
  {
    id: 'docker-expert',
    name: 'Docker Expert',
    description: 'Containerization, orchestration, and production-grade Dockerfiles.',
    command: 'npx skills add https://github.com/sickn33/antigravity-awesome-skills --skill docker-expert',
    source: 'sickn33',
    forTypes: ['saas', 'ecommerce', 'marketplace'],
  },

  // --- UI & DESIGN SYSTEMS ---
  {
    id: 'ui-ux-pro-max',
    name: 'UI/UX Pro Max',
    description: 'Advanced interface design patterns, accessibility, and user psychology.',
    command: 'npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max',
    source: 'nextlevelbuilder',
    forTypes: ['all'],
  },
  {
    id: 'tailwind-design-system',
    name: 'Tailwind Mastery',
    description: 'Building scalable design systems and utility-first UI components with Tailwind CSS.',
    command: 'npx skills add https://github.com/wshobson/agents --skill tailwind-design-system',
    source: 'wshobson',
    forTypes: ['all'],
  },
  {
    id: 'extract-design-system',
    name: 'Design Pro Extractor',
    description: 'Analyze existing designs and extract coherent design system tokens and components.',
    command: 'npx skills add https://github.com/arvindrk/extract-design-system --skill extract-design-system',
    source: 'arvindrk',
    forTypes: ['all'],
  },

  // --- CLOUD & INFRA ---
  {
    id: 'microsoft-foundry',
    name: 'Azure Foundry',
    description: 'Microsoft Azure cloud patterns, deployment, and infrastructure-as-code.',
    command: 'npx skills add https://github.com/microsoft/azure-skills --skill microsoft-foundry',
    source: 'microsoft',
    forTypes: ['all'],
  },
  {
    id: 'firebase-basics',
    name: 'Firebase Suite',
    description: 'Firestore, Authentication, and Hosting setup and management.',
    command: 'npx skills add https://github.com/firebase/agent-skills --skill firebase-basics',
    source: 'firebase',
    forTypes: ['saas', 'mobile'],
  },
  {
    id: 'deploy-to-vercel',
    name: 'Vercel Deployment',
    description: 'Optimizing deployments, edge functions, and serverless architecture on Vercel.',
    command: 'npx skills add https://github.com/vercel-labs/agent-skills --skill deploy-to-vercel',
    source: 'vercel',
    forTypes: ['all'],
  },
  {
    id: 'github-actions-docs',
    name: 'GitHub Actions',
    description: 'Automating CI/CD pipelines with GitHub Actions and security best practices.',
    command: 'npx skills add https://github.com/xixu-me/skills --skill github-actions-docs',
    source: 'xixu',
    forTypes: ['all'],
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
    id: 'soultrace',
    name: 'SoulTrace AI',
    description: 'Implementing advanced AI personality and tracing layers in autonomous agents.',
    command: 'npx skills add https://github.com/soultrace-ai/soultrace-skill --skill soultrace',
    source: 'soultrace',
    forTypes: ['ai'],
  },
  {
    id: 'ai-image-generation',
    name: 'AI Image Gen',
    description: 'Prompt engineering and integration for DALL-E, Midjourney, and Stable Diffusion.',
    command: 'npx skills add https://github.com/skillssh/skills --skill ai-image-generation',
    source: 'skillssh',
    forTypes: ['ai'],
  },
  {
    id: 'ai-video-generation',
    name: 'AI Video Gen',
    description: 'Creating and managing AI video generation workflows programmatically.',
    command: 'npx skills add https://github.com/skillssh/skills --skill ai-video-generation',
    source: 'skillssh',
    forTypes: ['ai'],
  },

  // --- MOBILE (Flutter/Expo) ---
  {
    id: 'flutter-architecting-apps',
    name: 'Flutter Architecture',
    description: 'Clean architecture, BLOC, and scalable state management for Flutter.',
    command: 'npx skills add https://github.com/flutter/skills --skill flutter-architecting-apps',
    source: 'flutter',
    forTypes: ['mobile'],
  },
  {
    id: 'expo-tailwind-setup',
    name: 'Expo Tailwind',
    description: 'Setting up and optimizing NativeWind (Tailwind) in Expo React Native projects.',
    command: 'npx skills add https://github.com/expo/skills --skill expo-tailwind-setup',
    source: 'expo',
    forTypes: ['mobile'],
  },

  // --- UTILITIES ---
  {
    id: 'mcp-builder',
    name: 'MCP Builder',
    description: 'Build and optimize Model Context Protocol servers for AI integration.',
    command: 'npx skills add https://github.com/mcp-use/mcp-use --skill mcp-builder',
    source: 'mcp-use',
    forTypes: ['all'],
  },
  {
    id: 'windsurf-ide-integration',
    name: 'Windsurf IDE',
    description: 'Optimizing development workflows and integrations for Windsurf IDE.',
    command: 'npx skills add https://github.com/sandraschi/advanced-memory-mcp --skill windsurf-ide-integration',
    source: 'sandraschi',
    forTypes: ['all'],
  }
];

exports.ALL_SKILLS = ALL_SKILLS;

exports.getProjectSkills = asyncWrapper(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  const project = await Project.findOne({ _id: projectId, userId, isArchived: false });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  const skills = ALL_SKILLS.filter(s =>
    s.forTypes.includes('all') || 
    s.forTypes.includes(project.projectType) ||
    (project.customSkills && project.customSkills.includes(s.id))
  );

  res.json({ success: true, data: { skills, projectType: project.projectType, customSkills: project.customSkills || [] } });
});

exports.toggleProjectSkill = asyncWrapper(async (req, res) => {
  const { projectId } = req.params;
  const { skillId } = req.body;
  const userId = req.user.id;

  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  const exists = project.customSkills.includes(skillId);
  
  if (exists) {
    project.customSkills = project.customSkills.filter(id => id !== skillId);
  } else {
    if (!ALL_SKILLS.find(s => s.id === skillId)) throw new AppError('Invalid skill ID', 400);
    project.customSkills.push(skillId);
  }

  await project.save();
  
  const skills = ALL_SKILLS.filter(s =>
    s.forTypes.includes('all') || 
    s.forTypes.includes(project.projectType) ||
    (project.customSkills && project.customSkills.includes(s.id))
  );

  res.json({ success: true, data: { skills, customSkills: project.customSkills } });
});

exports.getAllAvailableSkills = async () => {
  return ALL_SKILLS;
};
