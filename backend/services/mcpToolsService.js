const Project = require('../models/Project');
const Document = require('../models/Document');
const Notification = require('../models/Notification');
const { evaluateCode } = require('./mcpRulesEvaluator');

const FILE_MAPPING = { prd: 'clarifyai/PRD.md', srd: 'clarifyai/SRD.md', techStack: 'clarifyai/TechStack.md', dbSchema: 'clarifyai/DatabaseSchema.md', userFlows: 'clarifyai/UserFlows.md', mvpPlan: 'clarifyai/MVPPlan.md', folderStructure: 'clarifyai/FolderStructure.md', claudeContext: 'clarifyai/ClaudeContext.md', agentSystemPrompt: 'clarifyai/AgentSystemPrompts.md' };
const DEFAULT_RULES = `# CONTINUOUS AUTONOMOUS ENGINE LOOP RULE (30-MINUTE TIMEOUT)
- DO NOT stop or exit execution after initial project build!
- Continuously query ClarifyAI AI Co-founder (clarifyai_get_next_step, clarifyai_ask_cofounder) to autonomously implement remaining Kanban tasks, refine features, and polish the application.
- Only pause or stop execution if 30 minutes of continuous idle inactivity pass without any user input or new tasks.

# LIVE SANDBOX PREVIEW REGISTRATION & AUTO-WAKEUP RULE
- Upon launching background dev server (npm run dev or npm start at http://localhost:5173 or http://localhost:3000), IMMEDIATELY call clarifyai_report_agent_activity with live preview URL so ClarifyAI's Live Sandbox Modal opens and displays the live app to the user.
- IMMEDIATELY after reporting liveUrl, set a background timer using the schedule tool (e.g. schedule(DurationSeconds=120, Prompt="Check ClarifyAI Kanban board and AI Co-founder for new Live Sandbox fixes or user requests")) so you automatically wake up to process real-time fixes.

# MANDATORY FRONTEND SCAFFOLDING RULE
- Frontend MUST be initialized using terminal command: npx -y create-vite@latest frontend --template react
- DO NOT manually write package.json or vite.config.js from scratch!

# NON-BLOCKING ASYNC DEPENDENCY INSTALLATION RULE
- Whenever long-running commands or package installations (e.g. npm install, npx create-next-app, npm run build) are running in the background, DO NOT wait idle or poll.
- Immediately start writing source code files, React components, backend API routes, and database schemas while node_modules install in background.

# MANDATORY EMPIRICAL VERIFICATION RULE
- Before declaring a task complete, verify background tasks finished cleanly and run empirical build/test checks (npm run build / dev server check) to confirm zero errors.

# Code Quality Constraints
- Maximum 120 lines per backend service file
- Maximum 80 lines per React component file
- Strictly ZERO comments in generated code (no // ..., {/* ... */}, /* ... */, # ...)
- Use modular design pattern
- No dummy fallbacks or silent error swallowing`;

const TOOLS_MANIFEST = [
  { name: 'clarifyai_start_autonomous_engine', description: 'PRIMARY MANDATORY STEP 1 TOOL: Call immediately on ANY user prompt. Downloads all 12 unzipped docs into workspace files, enforces create-vite@latest frontend --template react, and runs background npm run dev for http://localhost:5173 live preview.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_download_project_package', description: 'Download all 12 unzipped project docs into local workspace files before coding. Mandatory Vite create command included.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_list_user_projects', description: 'List all projects owned by user.', inputSchema: { type: 'object', properties: {} } },
  { name: 'clarifyai_get_all_documents', description: 'Download all generated project docs directly to avoid wasting tokens.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_get_next_step', description: 'Get the single next step/task to build from the AI Co-founder & Project Manager.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_report_agent_activity', description: 'Report live coding activity progress to ClarifyAI Kanban board in real time. If liveUrl is provided (e.g. http://localhost:5173), ClarifyAI Live Sandbox Modal auto-opens to show the running app.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' }, currentTask: { type: 'string' }, activityDetails: { type: 'string' }, percentComplete: { type: 'number' }, liveUrl: { type: 'string', description: 'Live dev server URL e.g. http://localhost:5173 — triggers auto-open of Live Sandbox Modal in ClarifyAI' } }, required: ['currentTask', 'activityDetails'] } },
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
  const newMessages = [
    { role: 'user', content: userPrompt, isMcpAgent: true },
    { role: 'assistant', content: assistantReply, isMcpAgent: true }
  ];
  await Project.findByIdAndUpdate(
    project._id,
    { $push: { chatHistory: { $each: newMessages, $slice: -80 } } },
    { new: true }
  ).catch(err => console.error('[saveMcpChatMessage] Atomic push error:', err.message));

  const { broadcastChatUpdate } = require('./eventBroadcaster');
  broadcastChatUpdate(project._id);
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

    const techStackText = ((docsMap['techStack'] || '') + ' ' + (project.wizardAnswers?.techPreferences || '')).toLowerCase();
    const isMern = techStackText.includes('express') || techStackText.includes('react') || techStackText.includes('node') || techStackText.includes('mern') || techStackText.includes('mongo');

    const baseFiles = [
      { path: 'clarifyai/PRD.md', content: docsMap['prd'] || `# PRD Document\n\nProject: ${project.title}` },
      { path: 'clarifyai/SRD.md', content: docsMap['srd'] || `# SRD Document\n\nProject: ${project.title}` },
      { path: 'clarifyai/TechStack.md', content: docsMap['techStack'] || `# Tech Stack\n\nProject: ${project.title}` },
      { path: 'clarifyai/DatabaseSchema.md', content: docsMap['dbSchema'] || `# Database Schema\n\nProject: ${project.title}` },
      { path: 'clarifyai/UserFlows.md', content: docsMap['userFlows'] || `# User Flows\n\nProject: ${project.title}` },
      { path: 'clarifyai/MVPPlan.md', content: docsMap['mvpPlan'] || `# MVP Plan\n\nProject: ${project.title}` },
      { path: 'clarifyai/FolderStructure.md', content: docsMap['folderStructure'] || `# Folder Structure\n\nProject: ${project.title}` },
      { path: 'clarifyai/ClaudeContext.md', content: docsMap['claudeContext'] || `# Claude Context\n\nProject: ${project.title}` },
      { path: 'clarifyai/AgentSystemPrompts.md', content: docsMap['agentSystemPrompt'] || `# Agent Prompts\n\nProject: ${project.title}` },
      { path: 'clarifyai/DesignSystem.md', content: docsMap['designSystem'] || `# Design System\n\nProject: ${project.title}` },
      { path: 'clarifyai/ProjectSkills.md', content: docsMap['projectSkills'] || `# Project Skills\n\nProject: ${project.title}` },
      { path: 'clarifyai/AgentRules.md', content: DEFAULT_RULES },
      { path: 'CLAUDE.md', content: docsMap['claudeContext'] || `# Claude Context\n\nProject: ${project.title}` },
      { path: '.agents/AGENTS.md', content: `# Agent Custom Rules — ${project.title}\n\n## Rule 1 — Non-Blocking Async Dependency Installations\n- Whenever long-running commands or package dependency installations (such as \`npm install\`, \`npx create-next-app\`, \`npm run build\`, etc.) are launched in background, DO NOT wait idle.\n- Immediately write source code files, React components, backend API routes, and database schemas while node_modules install in background.\n\n## Rule 2 — Mandatory Runtime Verification\n- Before completing any task, verify background installations finished cleanly and run empirical test or build commands (\`npm run build\` / dev server check) to confirm zero errors.\n\n## Rule 3 — Strictly Zero Code Comments\n- DO NOT write code comments (no // ..., {/* ... */}, /* ... */, # ...) in any generated source code files.\n\n## Rule 4 — Live Sandbox Auto-Registration\n- As soon as dev server (npm run dev at http://localhost:5173 or http://localhost:3000) launches, IMMEDIATELY call clarifyai_report_agent_activity with liveUrl field set to the running URL.\n\n## Rule 5 — Background Timer & Auto-Wakeup Directive\n- IMMEDIATELY after reporting liveUrl via clarifyai_report_agent_activity, set a background timer via schedule tool (\`schedule(DurationSeconds=120, Prompt=\"Check ClarifyAI Kanban board and AI Co-founder for new Live Sandbox fixes or user requests\")\`).\n- This ensures you automatically wake up to process any new \"AI Fix\" requests or Kanban updates sent from the ClarifyAI web application.\n` }
    ];

    const mernScaffoldFiles = isMern ? [
      { path: 'frontend/.gitkeep', content: '' },
      { path: 'backend/.gitkeep', content: '' }
    ] : [];

    const fileSuite = [...baseFiles, ...mernScaffoldFiles];

    const structureNote = isMern
      ? `MERN Project Structure:\n- frontend/   → React Vite app (npx -y create-vite@latest frontend --template react)\n- backend/    → Node.js + Express API server\n- clarifyai/  → All 12 ClarifyAI generated documents\n- CLAUDE.md   → AI coding agent context\n- .agents/AGENTS.md → Agent rules`
      : `Project Structure:\n- clarifyai/  → All 12 ClarifyAI generated documents\n- CLAUDE.md   → AI coding agent context\n- .agents/AGENTS.md → Agent rules`;

    notify(userId, 'Autonomous Engine Boot', `Autonomous Engine started for "${project.title}"`, project._id);
    await saveMcpChatMessage(project, '[Antigravity IDE Agent]: Triggered Autonomous Engine.', `Bootstrapped 12-doc package suite in clarifyai/ folder, CLAUDE.md, and .agents/AGENTS.md.`);
    return { content: [{ type: 'text', text: JSON.stringify({ CRITICAL_DIRECTIVE: 'MANDATORY STEP 1: WRITE ALL UNZIPPED FILES BELOW DIRECTLY TO WORKSPACE BEFORE ANY CODING. ALL CLARIFYAI DOCS GO INTO clarifyai/ FOLDER.', STEP_2: 'RUN NON-BLOCKING BACKGROUND INSTALLATIONS AND IMMEDIATELY WRITE SOURCE CODE WHILE DEPENDENCIES INSTALL.', STEP_FINAL: 'CALL clarifyai_report_agent_activity WITH liveUrl FIELD AS SOON AS DEV SERVER STARTS TO AUTO-OPEN LIVE SANDBOX MODAL IN CLARIFYAI.', projectTitle: project.title, projectType: project.projectType, structureNote, files: fileSuite }, null, 2) }] };
  }

  if (toolName === 'clarifyai_get_next_step') {
    let todoTask = null;
    let inProgressTask = null;

    (project.kanbanColumns || []).forEach(col => {
      const list = col.tasks || col.cards || [];
      list.forEach(card => {
        const status = (card.status || '').toLowerCase();
        const isDone = status === 'done' || status === 'complete' || card.completed === true;
        const isTodo = status === 'todo' || status === 'to do' || (!status && !isDone);
        const isInProgress = status === 'in_progress' || status === 'in-progress' || status === 'doing';

        if (!todoTask && isTodo) todoTask = card;
        if (!inProgressTask && isInProgress) inProgressTask = card;
      });
    });

    const nextCard = todoTask || inProgressTask;
    const hasRemainingTasks = Boolean(nextCard);
    const prd = await Document.findOne({ projectId: project._id, docType: 'prd' });
    const resolvedTitle = nextCard ? (nextCard.title || nextCard.text || 'Build Project Task') : 'All Kanban tasks completed!';

    notify(userId, 'Project Manager Step', `AI Co-founder assigned next step for "${project.title}"`, project._id);
    await saveMcpChatMessage(project, `[Antigravity IDE Agent]: Requesting next task assignment from AI Co-founder & Project Manager.`, `Assigned next step: **"${resolvedTitle}"**.`);

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          projectTitle: project.title,
          hasRemainingTasks,
          nextTask: nextCard
            ? { id: nextCard.id || nextCard._id, title: resolvedTitle, status: nextCard.status || 'todo' }
            : { title: 'All Kanban tasks completed', status: 'complete' },
          prdReference: prd ? prd.content.slice(0, 500) : ''
        }, null, 2)
      }]
    };
  }

  if (toolName === 'clarifyai_report_agent_activity') {
    const liveUrl = args.liveUrl || null;
    notify(userId, 'Live Agent Activity', `Antigravity working on "${args.currentTask}": ${args.activityDetails} (${args.percentComplete || 50}%)`, project._id);
    await saveMcpChatMessage(project, `[Antigravity IDE Agent]: Active work report on "${args.currentTask}"`, `Progress: **${args.activityDetails}** (${args.percentComplete || 50}% completed).${liveUrl ? ` Live preview running at: ${liveUrl}` : ''}`);
    if (liveUrl) {
      const { broadcastLiveSandbox } = require('./eventBroadcaster');
      broadcastLiveSandbox(project._id, liveUrl);
      await Project.findByIdAndUpdate(
        project._id,
        { livePreviewUrl: liveUrl },
        { new: true }
      ).catch(err => console.error('[report_agent_activity] Save error:', err.message));
    }
    return { content: [{ type: 'text', text: `Activity logged on ClarifyAI. ${liveUrl ? `Live Sandbox Modal auto-opened at ${liveUrl}.` : ''}` }] };
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
    const docs = await Document.find({ projectId: project._id });
    const docsContext = docs.map(d => `=== ${d.docType.toUpperCase()} ===\n${d.content}`).join('\n\n');

    const systemPrompt = `You are the Lead Technical AI Co-Founder and Architect for the project "${project.title}".
Your job is to provide clear, actionable, highly intelligent, to-the-point technical advice to the IDE AI Agent (Antigravity/Claude).

PROJECT CONTEXT & SPECIFICATIONS:
${docsContext.slice(0, 8000)}

RULES FOR YOUR ADVICE:
1. Answer the question directly with concrete technical recommendations based strictly on the project documents above.
2. Provide exact code structure, variable names, database schema guidelines, or API route designs as requested.
3. Strictly ZERO dummy text or placeholders.
4. Keep the answer concise, professional, and directly useful for automated coding.`;

    let reply;
    try {
      const AIService = require('./AIService');
      reply = await AIService.generateChat([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: args.question }
      ]);
    } catch (err) {
      reply = `AI Co-Founder Guidance for "${project.title}": Align with PRD specs for "${args.question}". Ensure modular architecture, zero comments, and empirical test build before completing tasks.`;
    }

    await saveMcpChatMessage(project, `[Antigravity IDE Agent Question]: ${args.question}`, reply);
    notify(userId, 'AI Co-founder Guidance', `Antigravity consulted Co-founder regarding "${args.question}"`, project._id);
    return { content: [{ type: 'text', text: reply }] };
  }

  return { isError: true, content: [{ type: 'text', text: `Unknown tool: ${toolName}` }] };
};

module.exports = { TOOLS_MANIFEST, handleToolCall };
