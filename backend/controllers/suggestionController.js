const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const AIService = require('../services/AIService');

const INSTANT_SUGGESTIONS = {
  title: {
    saas: ['NovaFlow AI', 'MetricPulse Engine', 'CloudSync Pro'],
    ecommerce: ['ShopPulse Marketplace', 'SwiftCart Express', 'VaultStore Commerce'],
    mobile: ['PulseApp Native', 'OmniGo Mobile', 'TaskSphere Pro'],
    ai: ['CogniFlow AI', 'MindScale Assistant', 'AetherBrain Engine'],
    default: ['PulseCore Studio', 'ApexFlow Engine', 'Vanguard Specs']
  },
  problemStatement: {
    saas: [
      'Teams waste over 15 hours weekly manually compiling project documentation and specs.',
      'Existing management tools are fragmented, leading to communication bottlenecks.',
      'High cost and complexity of setting up custom enterprise architecture pipelines.'
    ],
    ecommerce: [
      'Small business owners struggle with high cart abandonment rates and slow checkouts.',
      'Lack of real-time inventory management causing overselling and customer dissatisfaction.',
      'Complex cross-border payment integration limiting international sales growth.'
    ],
    default: [
      'Users face significant friction and delays trying to coordinate complex project workflows.',
      'Current market alternatives lack automated smart context and real-time generation features.',
      'High manual overhead required to translate product vision into production-ready specs.'
    ]
  },
  targetAudience: {
    saas: [
      'Indie hackers, startup founders, and agile product managers.',
      'Mid-market software engineering teams requiring automated workflow specs.',
      'Technical project leads and solutions architects looking to streamline dev handover.'
    ],
    default: [
      'Digital entrepreneurs, startup builders, and tech product leads.',
      'Freelance developers and agencies managing multiple client projects.',
      'Early-stage teams seeking fast MVP planning and architectural blueprints.'
    ]
  },
  coreFeatures: {
    saas: [
      'User Auth & RBAC, AI Document Synthesis, Kanban Task Workspace, Stripe Subscriptions',
      'Real-time Analytics Dashboard, Team Workspaces, PDF/ZIP Export Engine, GitHub Sync',
      'Automated API Generator, Custom Design System Builder, WebContainer Live Preview'
    ],
    default: [
      'User Authentication, Data Dashboard, Automated Workflow Generator, Real-time Alerts',
      'Interactive Workspace, Multi-format Export, API Gateway, Integrated Search',
      'Role-based Permissions, Activity Logs, Custom Preset Builder, Dark/Neumorphic Theme'
    ]
  },
  techPreferences: {
    default: [
      'React + Vite, Node.js + Express, MongoDB, Tailwind CSS (MERN Stack)',
      'Next.js (App Router), TypeScript, Supabase, Tailwind CSS, Vercel',
      'React Native, Node.js, PostgreSQL, Prisma, Docker'
    ]
  },
  monetizationModel: {
    default: [
      'Freemium with Pro Tier ($19/mo) and Team Tier ($49/mo)',
      '14-Day Free Trial followed by Flat Monthly Subscription',
      'Usage-based Token Credits with Enterprise Custom Pricing'
    ]
  },
  additionalContext: {
    default: [
      'Prioritize mobile-first responsive layout with high-contrast Neumorphism UI styling.',
      'Implement strict end-to-end data isolation per project and tenant.',
      'Ensure zero-comment clean code generation and instant live sandbox preview.'
    ]
  }
};

function getFallbackList(fieldName, projectType) {
  const typeKey = (projectType || '').toLowerCase();
  const fieldDict = INSTANT_SUGGESTIONS[fieldName] || INSTANT_SUGGESTIONS.additionalContext;
  return fieldDict[typeKey] || fieldDict.default || INSTANT_SUGGESTIONS.title.default;
}

exports.getSuggestions = asyncWrapper(async (req, res) => {
  const { projectTitle, projectType, fieldName, currentValue, wizardAnswers } = req.body;

  if (!fieldName) throw new AppError('fieldName required', 400, 'VALIDATION_ERROR');

  const fallback = getFallbackList(fieldName, projectType);

  const prompt = buildSuggestionPrompt(projectTitle, projectType, fieldName, currentValue, wizardAnswers);

  const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 800));
  const aiPromise = AIService.generateText(prompt, 'suggestion', 256).catch(() => null);

  const winner = await Promise.race([aiPromise, timeoutPromise]);

  if (winner && winner.content) {
    const parsed = parseSuggestions(winner.content);
    if (parsed && parsed.length > 0) {
      return res.json({ success: true, data: { suggestions: parsed } });
    }
  }

  res.json({ success: true, data: { suggestions: fallback } });
});

function buildSuggestionPrompt(title, type, fieldName, currentValue, wizardAnswers = {}) {
  const categoryStr = type ? `[Category: ${type.toUpperCase()}]` : '[Category: GENERAL]';
  const titleStr = title ? `[Project Title: "${title}"]` : '';
  const problemStr = wizardAnswers.problemStatement ? `[Problem: "${wizardAnswers.problemStatement}"]` : '';
  const audienceStr = wizardAnswers.targetAudience ? `[Target Audience: "${wizardAnswers.targetAudience}"]` : '';
  const featuresStr = wizardAnswers.coreFeatures ? `[Features: "${wizardAnswers.coreFeatures}"]` : '';

  const contextHeader = [categoryStr, titleStr, problemStr, audienceStr, featuresStr].filter(Boolean).join('\n');

  const fieldInstructions = {
    title: `Suggest 3 short, catchy product names (2-5 words each) tailored specifically for a ${type || 'software'} project.`,
    problemStatement: `Suggest 3 concise, realistic problem statements (1-2 sentences) tailored specifically for a ${type || 'software'} project named "${title || 'this app'}".`,
    targetAudience: `Suggest 3 specific target audience profiles (1-2 sentences) for a ${type || 'software'} project named "${title || 'this app'}".`,
    coreFeatures: `Suggest 3 sets of 4-5 comma-separated MVP features designed for a ${type || 'software'} project named "${title || 'this app'}".`,
    techPreferences: `Suggest 3 tech stack combinations (e.g. React/Node/MongoDB, Next.js/Supabase, React Native/Firebase) ideal for a ${type || 'software'} project.`,
    monetizationModel: `Suggest 3 monetization models (e.g. SaaS Monthly Subscription, Pay-per-use, Tiered Plans) suitable for a ${type || 'software'} project.`,
    additionalContext: `Suggest 3 strategic context or competitive advantage notes for a ${type || 'software'} project named "${title || 'this app'}".`,
  };

  const instruction = fieldInstructions[fieldName] || `Suggest 3 ideas tailored for a ${type || 'software'} project.`;
  const currentContext = currentValue ? `\nCurrent input draft: "${currentValue.slice(0, 100)}"` : '';

  return `Context:
${contextHeader}${currentContext}

Task: ${instruction}

Rules:
- Exactly 3 suggestions
- Each starts with "- "
- No numbering or extra formatting
- Make suggestions highly relevant to the ${type || 'software'} category and project context`;
}

function parseSuggestions(raw) {
  return raw
    .split('\n')
    .map(line => line.replace(/^[-•*]\s*/, '').trim())
    .filter(line => line.length > 0)
    .slice(0, 3);
}
