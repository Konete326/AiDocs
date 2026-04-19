module.exports = (wizardAnswers, context) => {
  const projectType = wizardAnswers?.techPreferences?.projectType || 'other';
  
  const TYPE_SKILLS = {
    saas:        ['docx', 'pdf', 'xlsx'],
    ecommerce:   ['docx', 'pdf'],
    marketplace: ['docx', 'pdf'],
    mobile:      ['mobile'],
    ai:          ['claude-api'],
  };
  
  const extraSkills = TYPE_SKILLS[projectType] || [];
  let skillCommands = '';
  extraSkills.forEach(name => {
    skillCommands += `npx skills add https://github.com/anthropics/skills --skill ${name}\n`;
  });

  let scaffoldCommands = '';
  if (projectType === 'mobile') {
    scaffoldCommands = `flutter create {project_name}\ncd {project_name}\nflutter pub upgrade`;
  } else if (projectType === 'ai') {
    scaffoldCommands = `python -m venv venv\nsource venv/bin/activate  # Windows: venv\\Scripts\\activate\npip install anthropic langchain openai python-dotenv fastapi uvicorn\npip freeze > requirements.txt`;
  } else {
    scaffoldCommands = `# Backend\nmkdir -p backend/src/{controllers,models,routes,middleware,services,utils}\ncd backend && npm init -y && npm install express@latest mongoose@latest dotenv@latest bcryptjs@latest jsonwebtoken@latest cors@latest helmet@latest\nnpm install -D nodemon@latest\n\n# Frontend\nnpm create vite@latest frontend -- --template react\ncd frontend && npm install\nnpm install react-router-dom@latest axios@latest`;
  }

  return `# Agent System Prompts — ${wizardAnswers?.projectName || 'Project'}

> Before doing anything else, read AGENT_RULES.md in the project root.
> All rules in that file apply to this project.

---

You are an expert AI systems architect. Generate a concise AI Agent System Prompt in raw Markdown format. No preamble, no code block fences.

## Project Info
${JSON.stringify(wizardAnswers, null, 2)}

## Previously Generated Documents
${context}

## Instructions
Create a master system prompt for AI assistants working on this specific project. Include: Role, Core Rules, and 3-5 example task prompts. Maximum 1000 words. Focus on making it practical for immediate use in developer tools.

## Agent Setup Order

Before writing any code, follow these steps in order:

### Step 1 — Install Skills
Skills teach you how to work on this project effectively.
Run these commands in your terminal:

\`\`\`bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/anthropics/skills --skill skill-creator
npx skills add https://github.com/vercel-labs/skills --skill find-skills
${skillCommands}\`\`\`

Note: The SwiftDocs AI platform shows all available skills in the project sidebar under the Skills section. You can copy the install commands directly from there.

### Step 2 — Scaffold Project with Commands
Never create files manually. Use CLI commands:
\`\`\`bash
${scaffoldCommands}
\`\`\`

Always install latest versions:
\`\`\`bash
npm install package-name@latest
\`\`\`

Use Vite for all React/Vue/Angular projects:
\`\`\`bash
npm create vite@latest project-name -- --template react
\`\`\`

### Step 3 — Read Documentation in Order
1. PRD.md
2. TechStack.md  
3. DatabaseSchema.md
4. FolderStructure.md
5. ClaudeContext.md
6. This file (AgentSystemPrompts.md)

### Step 4 — Build
Now implement the features described in the documentation.
Check latest package versions before every install.`;
};