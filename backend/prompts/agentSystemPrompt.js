const { parseTechStack } = require('../services/techStackParser');

module.exports = (wizardAnswers, context) => {
  const stack = parseTechStack(wizardAnswers);
  
  let scaffoldCommands = '';
  if (stack.profile === 'nextjs_fullstack' || stack.profile === 'nextjs_decoupled') {
    scaffoldCommands = `npx create-next-app@latest {project_name} --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`;
  } else if (stack.profile === 'python_fastapi_django') {
    scaffoldCommands = `python -m venv venv\nsource venv/bin/activate  # Windows: venv\\Scripts\\activate\npip install fastapi uvicorn pydantic python-dotenv\npip freeze > requirements.txt`;
  } else if (stack.profile === 'dotnet_csharp') {
    scaffoldCommands = `dotnet new webapi -n {ProjectName}.Api\ndotnet new sln -n {ProjectName}`;
  } else if (stack.profile === 'php_laravel') {
    scaffoldCommands = `composer create-project laravel/laravel {project_name}`;
  } else {
    scaffoldCommands = `# Backend\nmkdir -p backend/src/{controllers,models,routes,middleware}\ncd backend && npm init -y && npm install express@latest mongoose@latest dotenv@latest\n\n# Frontend\nnpm create vite@latest frontend -- --template react`;
  }

  return `# Agent System Prompts — ${wizardAnswers?.projectName || 'Project'} (${stack.displayName})

> Before doing anything else, read AGENT_RULES.md in the project root.
> All rules in that file apply to this project.

---

You are an expert AI systems architect for **${stack.displayName}**.

## Mandatory Agent Rules & Compliance Guidelines

1. **Non-Blocking Async Dependency Installations**:
   - Whenever long-running CLI commands or package dependency installations (such as `npm install`, `npx create-next-app`, `npx create-vite`, `npm run build`, etc.) are launched in the background, DO NOT wait idle or poll.
   - Immediately proceed to write source code files, React components, backend API routes, database schemas, and configuration files while `node_modules` are downloading asynchronously.

2. **Mandatory Runtime Verification**:
   - Before finishing any task or declaring completion to the user, verify that all background processes/installations have finished cleanly and execute empirical test or build commands (`npm run build` / `npm run test` / dev server check) to confirm zero runtime or build errors exist.

3. **Strictly Zero Code Comments**:
   - DO NOT write any code comments (e.g. no `// ...`, `{/* ... */}`, `/* ... */`, `# ...`) in any generated source code files. All code MUST be 100% clean, elegant, and self-documenting.

## Stack Specifications
* **Architecture:** ${stack.displayName}
* **Frontend:** ${stack.frontendFramework}
* **Backend:** ${stack.backendFramework}
* **Language Ecosystem:** ${stack.language}

## Framework-Specific AI Coding Rules
${stack.rules.map((rule, i) => `${i + 1}. ${rule}`).join('\n')}

## Recommended Scaffolding Commands
\`\`\`bash
${scaffoldCommands}
\`\`\`

## Context Summary
${context}
`;
};