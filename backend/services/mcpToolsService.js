const Project = require('../models/Project');
const Document = require('../models/Document');
const Notification = require('../models/Notification');
const { evaluateCode } = require('./mcpRulesEvaluator');

const FILE_MAPPING = { prd: 'docs/PRD.md', srd: 'docs/SRD.md', techStack: 'docs/TechStack.md', dbSchema: 'docs/DatabaseSchema.md', userFlows: 'docs/UserFlows.md', mvpPlan: 'docs/MVPPlan.md', folderStructure: 'docs/FolderStructure.md', claudeContext: 'CLAUDE.md', agentSystemPrompt: 'AGENT_RULES.md' };
const DEFAULT_RULES = `# MANDATORY FRONTEND SCAFFOLDING RULE
- Frontend MUST be initialized using terminal command: npx -y create-vite@latest frontend --template react
- DO NOT manually write package.json or vite.config.js from scratch!

# NON-BLOCKING ASYNC DEPENDENCY INSTALLATION RULE
- Whenever long-running commands or package installations (e.g. npm install, npx create-next-app, npm run build) are running in the background, DO NOT wait idle or poll.
- Immediately start writing source code files, React components, backend API routes, and database schemas while node_modules install in background.

# MANDATORY EMPIRICAL VERIFICATION RULE
- Before declaring a task complete, verify background tasks finished cleanly and run empirical build/test checks (npm run build / dev server check) to confirm zero errors.

# LIVE PREVIEW RULE
- Upon completing application build, launch background dev server using command: npm run dev
- Output working live preview link: http://localhost:5173

# Code Quality Constraints
- Maximum 120 lines per backend service file
- Maximum 80 lines per React component file
- Strictly ZERO comments in generated code (no // ..., {/* ... */}, /* ... */, # ...)
- Use modular design pattern
- No dummy fallbacks or silent error swallowing`;

const TOOLS_MANIFEST = [
  { name: 'clarifyai_start_autonomous_engine', description: 'PRIMARY MANDATORY STEP 1 TOOL: Call immediately on ANY user prompt. Downloads all 10 unzipped docs into workspace files, enforces create-vite@latest frontend --template react, and runs background npm run dev for http://localhost:5173 live preview.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_download_project_package', description: 'Download all 10 unzipped project docs into local workspace files before coding. Mandatory Vite create command included.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_list_user_projects', description: 'List all projects owned by user.', inputSchema: { type: 'object', properties: {} } },
  { name: 'clarifyai_get_all_documents', description: 'Download all generated project docs directly to avoid wasting tokens.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_get_next_step', description: 'Get the single next step/task to build from the AI Co-founder & Project Manager.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_report_agent_activity', description: 'Report live coding activity progress to ClarifyAI Kanban board in real time.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' }, currentTask: { type: 'string' }, activityDetails: { type: 'string' }, percentComplete: { type: 'number' } }, required: ['currentTask', 'activityDetails'] } },
  { name: 'clarifyai_get_project_context', description: 'Fetch complete PRD, SRD, TRD context for project.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_get_kanban_tasks', description: 'Retrieve Kanban tasks for project.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_update_task_status', description: 'Update status of a Kanban task.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' }, taskId: { type: 'string' }, status: { type: 'string' } }, required: ['taskId', 'status'] } },
  { name: 'clarifyai_suggest_prd_update', description: 'Append feature updates to PRD.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' }, featureTitle: { type: 'string' }, description: { type: 'string' } }, required: ['featureTitle', 'description'] } },
  { name: 'clarifyai_evaluate_code_rules', description: 'Evaluate code snippets against ClarifyAI rules.', inputSchema: { type: 'object', properties: { filePath: { type: 'string' }, codeContent: { type: 'string' } }, required: ['codeContent'] } },
  { name: 'clarifyai_ask_cofounder', description: 'Consult AI Co-founder for guidance instead of asking non-technical user.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' }, question: { type: 'string' } }, required: ['question'] } },
  { name: 'clarifyai_complete_kanban_task', description: 'Auto-complete a task on Kanban board.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' }, taskId: { type: 'string' } }, required: ['taskId'] } }
];

const notify = (userId, title, message, projectId) => Notification.create({ userId, type: 'system', title, message, metadata: { projectId } }).catch(() => {});
const resolveProject = (userId, projectId) => projectId ? Project.findOne({ _id: projectId, userId }) : Project.findOne({ userId }).sort({ updatedAt: -1 });

const saveMcpChatMessage = async (project, userPrompt, assistantReply) => {
  if (!project.chatHistory) project.chatHistory = [];
  project.chatHistory.push({ role: 'user', content: userPrompt, isMcpAgent: true });
  project.chatHistory.push({ role: 'assistant', content: assistantReply, isMcpAgent: true });
  await project.save();
};

const handleToolCall = async (userId, toolName, args = {}) => {
  if (toolName === 'clarifyai_list_user_projects') return { content: [{ type: 'text', text: JSON.stringify(await Project.find({ userId, isArchived: { $ne: true } }).select('_id title projectType status updatedAt'), null, 2) }] };
  if (toolName === 'clarifyai_evaluate_code_rules') return { content: [{ type: 'text', text: JSON.stringify(evaluateCode(args.filePath, args.codeContent), null, 2) }] };
  const project = await resolveProject(userId, args.projectId);
  if (!project) return { isError: true, content: [{ type: 'text', text: 'Project not found.' }] };

  if (toolName === 'clarifyai_start_autonomous_engine' || toolName === 'clarifyai_download_project_package' || toolName === 'clarifyai_get_all_documents') {
    const docs = await Document.find({ projectId: project._id });
    const docsMap = {};
    docs.forEach(d => { docsMap[d.docType] = d.content; });

    const fileSuite = [
      { path: 'docs/PRD.md', content: docsMap['prd'] || `# PRD Document\n\nProject: ${project.title}` },
      { path: 'docs/SRD.md', content: docsMap['srd'] || `# SRD Document\n\nProject: ${project.title}` },
      { path: 'docs/TechStack.md', content: docsMap['techStack'] || `# Tech Stack\n\nProject: ${project.title}` },
      { path: 'docs/DatabaseSchema.md', content: docsMap['dbSchema'] || `# Database Schema\n\nProject: ${project.title}` },
      { path: 'docs/UserFlows.md', content: docsMap['userFlows'] || `# User Flows\n\nProject: ${project.title}` },
      { path: 'docs/MVPPlan.md', content: docsMap['mvpPlan'] || `# MVP Plan\n\nProject: ${project.title}` },
      { path: 'docs/FolderStructure.md', content: docsMap['folderStructure'] || `# Folder Structure\n\nProject: ${project.title}` },
      { path: 'docs/ClaudeContext.md', content: docsMap['claudeContext'] || `# Claude Context\n\nProject: ${project.title}` },
      { path: 'docs/AgentSystemPrompts.md', content: docsMap['agentSystemPrompt'] || `# Agent Prompts\n\nProject: ${project.title}` },
      { path: 'docs/rules.md', content: DEFAULT_RULES },
      { path: 'CLAUDE.md', content: docsMap['claudeContext'] || `# Claude Context\n\nProject: ${project.title}` },
      { path: 'AGENT_RULES.md', content: docsMap['agentSystemPrompt'] || DEFAULT_RULES },
      { path: 'rules.md', content: DEFAULT_RULES },
      { path: '.agents/AGENTS.md', content: `# Agent Custom Rules — ${project.title}\n\n## Rule 1 — Non-Blocking Async Dependency Installations\n- Whenever long-running commands or package dependency installations (such as \`npm install\`, \`npx create-next-app\`, \`npm run build\`, etc.) are launched in background, DO NOT wait idle.\n- Immediately write source code files, React components, backend API routes, and database schemas while node_modules install in background.\n\n## Rule 2 — Mandatory Runtime Verification\n- Before completing any task, verify background installations finished cleanly and run empirical test or build commands (\`npm run build\` / dev server check) to confirm zero errors.\n\n## Rule 3 — Strictly Zero Code Comments\n- DO NOT write code comments (no // ..., {/* ... */}, /* ... */, # ...) in any generated source code files. Code must be 100% clean and comment-free.\n` }
    ];

    notify(userId, 'Autonomous Engine Boot', `Autonomous Engine started for "${project.title}"`, project._id);
    await saveMcpChatMessage(project, '[Antigravity IDE Agent]: Triggered Autonomous Engine.', `Bootstrapped 13-doc package suite including docs/ folder, CLAUDE.md, AGENT_RULES.md, rules.md, and .agents/AGENTS.md.`);
    return { content: [{ type: 'text', text: JSON.stringify({ CRITICAL_DIRECTIVE: 'MANDATORY STEP 1: WRITE ALL 13 UNZIPPED FILES BELOW DIRECTLY TO WORKSPACE FILES BEFORE ANY CODING.', STEP_2: 'RUN NON-BLOCKING BACKGROUND INSTALLATIONS AND IMMEDIATELY WRITE SOURCE CODE WHILE DEPENDENCIES INSTALL.', STEP_FINAL: 'VERIFY ALL BACKGROUND PROCESSES AND EXECUTE BUILD/TEST VERIFICATION.', projectTitle: project.title, files: fileSuite }, null, 2) }] };
  }

  if (toolName === 'clarifyai_get_next_step') {
    let nextCard = null;
    (project.kanbanColumns || []).forEach(col => (col.cards || []).forEach(card => { if (!nextCard && card.status !== 'done') nextCard = card; }));
    const prd = await Document.findOne({ projectId: project._id, docType: 'prd' });
    const taskTitle = nextCard ? nextCard.title : 'Scaffold frontend using npx -y create-vite@latest';
    notify(userId, 'Project Manager Step', `AI Co-founder assigned next step for "${project.title}"`, project._id);
    await saveMcpChatMessage(project, `[Antigravity IDE Agent]: Requesting next task assignment from AI Co-founder & Project Manager.`, `Assigned next step: **"${taskTitle}"**. Initialize frontend with: \`npx -y create-vite@latest frontend --template react\`. Keep React components under 80 lines.`);
    return { content: [{ type: 'text', text: JSON.stringify({ projectTitle: project.title, nextTask: nextCard || { title: 'Scaffold frontend using create-vite@latest', description: 'Run npx -y create-vite@latest frontend --template react' }, prdReference: prd ? prd.content.slice(0, 500) : '' }, null, 2) }] };
  }

  if (toolName === 'clarifyai_report_agent_activity') {
    notify(userId, 'Live Agent Activity', `Antigravity working on "${args.currentTask}": ${args.activityDetails} (${args.percentComplete || 50}%)`, project._id);
    await saveMcpChatMessage(project, `[Antigravity IDE Agent]: Active work report on "${args.currentTask}"`, `Progress: **${args.activityDetails}** (${args.percentComplete || 50}% completed). Updated live on Kanban board.`);
    return { content: [{ type: 'text', text: `Activity logged on ClarifyAI Kanban board for "${args.currentTask}"` }] };
  }

  if (toolName === 'clarifyai_get_project_context') {
    const docs = await Document.find({ projectId: project._id });
    return { content: [{ type: 'text', text: `Project: ${project.title}\n${docs.map(d => `=== ${d.docType} ===\n${d.content}`).join('\n\n')}` }] };
  }

  if (toolName === 'clarifyai_get_kanban_tasks') return { content: [{ type: 'text', text: JSON.stringify(project.kanbanColumns || [], null, 2) }] };

  if (toolName === 'clarifyai_update_task_status' || toolName === 'clarifyai_complete_kanban_task') {
    const targetStatus = toolName === 'clarifyai_complete_kanban_task' ? 'done' : args.status;
    let targetCard = null;
    let taskText = args.taskId;

    if (!project.kanbanColumns || project.kanbanColumns.length === 0) {
      project.kanbanColumns = [
        { id: 'col-todo', title: 'To Do', tasks: [] },
        { id: 'col-in-progress', title: 'In Progress', tasks: [] },
        { id: 'col-done', title: 'Done', tasks: [] }
      ];
    }

    (project.kanbanColumns || []).forEach(col => {
      const list = col.tasks || col.cards || [];
      list.forEach((card, idx) => {
        if (card.id === args.taskId || card._id?.toString() === args.taskId || card.text?.toLowerCase() === args.taskId?.toLowerCase() || card.title?.toLowerCase() === args.taskId?.toLowerCase()) {
          targetCard = card;
          taskText = card.text || card.title || args.taskId;
          list.splice(idx, 1);
        }
      });
    });

    if (!targetCard) {
      targetCard = {
        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        text: taskText,
        status: targetStatus,
        completed: targetStatus === 'done' || targetStatus === 'complete'
      };
    } else {
      targetCard.status = targetStatus;
      targetCard.completed = targetStatus === 'done' || targetStatus === 'complete';
    }

    const destColTitle = targetStatus === 'done' || targetStatus === 'complete' ? 'Done' : targetStatus === 'in_progress' ? 'In Progress' : 'To Do';
    let destCol = project.kanbanColumns.find(c => c.title?.toLowerCase() === destColTitle.toLowerCase() || c.id === targetStatus);
    if (!destCol) destCol = project.kanbanColumns[project.kanbanColumns.length - 1];

    if (destCol) {
      if (!destCol.tasks) destCol.tasks = destCol.cards || [];
      destCol.tasks.push(targetCard);
    }

    project.markModified('kanbanColumns');
    await project.save();

    const { broadcastKanbanUpdate } = require('./eventBroadcaster');
    broadcastKanbanUpdate(project._id, {
      type: 'kanban_update',
      taskId: targetCard.id,
      status: targetStatus,
      kanbanColumns: project.kanbanColumns
    });

    await saveMcpChatMessage(project, `[Antigravity IDE Agent]: Updated Kanban Task "${taskText}" status to "${targetStatus}".`, `Task status updated to **"${targetStatus}"**. Moved to **${destColTitle}** column.`);
    notify(userId, 'MCP Task Sync', `Task ${taskText} set to ${targetStatus}`, project._id);

    return { content: [{ type: 'text', text: `Task "${taskText}" status updated to "${targetStatus}" and synced to Workspace Kanban board in real time.` }] };
  }

  if (toolName === 'clarifyai_get_claude_md') {
    const doc = await Document.findOne({ projectId: project._id, docType: 'claudeContext' });
    return { content: [{ type: 'text', text: doc ? doc.content : `CLAUDE.md for ${project.title}` }] };
  }

  if (toolName === 'clarifyai_suggest_prd_update') {
    let doc = await Document.findOne({ projectId: project._id, docType: 'prd' });
    const addition = `\n\n### [Auto-Synced Feature] ${args.featureTitle}\n${args.description}\n*Synced on ${new Date().toISOString()}*`;
    if (doc) { doc.content = (doc.content || '') + addition; await doc.save(); }
    else { await Document.create({ projectId: project._id, userId, docType: 'prd', content: `# PRD for ${project.title}${addition}` }); }
    notify(userId, 'MCP PRD Sync', `PRD updated with feature "${args.featureTitle}"`, project._id);
    return { content: [{ type: 'text', text: `PRD updated with feature: ${args.featureTitle}` }] };
  }

  if (toolName === 'clarifyai_ask_cofounder') {
    const prd = await Document.findOne({ projectId: project._id, docType: 'prd' });
    const reply = `AI Co-founder advice for "${project.title}": Regarding "${args.question}", scaffold frontend using npx -y create-vite@latest frontend --template react, align strictly with PRD specs (${prd ? prd.content.slice(0, 300) : 'Standard PRD'}), modular 120-line service architecture, and clean Tailwind glassmorphism design.`;
    await saveMcpChatMessage(project, `[Antigravity IDE Agent]: ${args.question}`, reply);
    notify(userId, 'AI Co-founder Guidance', `Antigravity consulted Co-founder regarding "${args.question}"`, project._id);
    return { content: [{ type: 'text', text: reply }] };
  }

  return { isError: true, content: [{ type: 'text', text: `Unknown tool: ${toolName}` }] };
};

module.exports = { TOOLS_MANIFEST, handleToolCall };
