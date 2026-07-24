const Project = require('../models/Project');
const Document = require('../models/Document');
const Notification = require('../models/Notification');
const { evaluateCode } = require('./mcpRulesEvaluator');

const FILE_MAPPING = { prd: 'docs/PRD.md', srd: 'docs/SRD.md', techStack: 'docs/TechStack.md', dbSchema: 'docs/DatabaseSchema.md', userFlows: 'docs/UserFlows.md', mvpPlan: 'docs/MVPPlan.md', folderStructure: 'docs/FolderStructure.md', claudeContext: 'CLAUDE.md', agentSystemPrompt: 'AGENT_RULES.md' };

const TOOLS_MANIFEST = [
  { name: 'clarifyai_list_user_projects', description: 'List all projects owned by the user.', inputSchema: { type: 'object', properties: {} } },
  { name: 'clarifyai_get_all_documents', description: 'CRITICAL: Download all generated project docs directly to avoid wasting tokens.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_get_next_step', description: 'CRITICAL: Get the single next step/task to build from the AI Co-founder & Project Manager instead of asking the user or guessing.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
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

const handleToolCall = async (userId, toolName, args = {}) => {
  if (toolName === 'clarifyai_list_user_projects') return { content: [{ type: 'text', text: JSON.stringify(await Project.find({ userId, isArchived: { $ne: true } }).select('_id title projectType status updatedAt'), null, 2) }] };
  if (toolName === 'clarifyai_evaluate_code_rules') return { content: [{ type: 'text', text: JSON.stringify(evaluateCode(args.filePath, args.codeContent), null, 2) }] };
  const project = await resolveProject(userId, args.projectId);
  if (!project) return { isError: true, content: [{ type: 'text', text: 'Project not found.' }] };

  if (toolName === 'clarifyai_get_all_documents') {
    const docs = await Document.find({ projectId: project._id });
    const fileSuite = docs.map(d => ({ docType: d.docType, targetFile: FILE_MAPPING[d.docType] || `docs/${d.docType}.md`, content: d.content }));
    notify(userId, 'Doc Download', `AI Agent downloaded document suite for "${project.title}"`, project._id);
    return { content: [{ type: 'text', text: JSON.stringify({ projectId: project._id, title: project.title, files: fileSuite }, null, 2) }] };
  }

  if (toolName === 'clarifyai_get_next_step') {
    let nextCard = null;
    (project.kanbanColumns || []).forEach(col => (col.cards || []).forEach(card => { if (!nextCard && card.status !== 'done') nextCard = card; }));
    const prd = await Document.findOne({ projectId: project._id, docType: 'prd' });
    notify(userId, 'Project Manager Step', `AI Co-founder assigned next step for "${project.title}"`, project._id);
    return { content: [{ type: 'text', text: JSON.stringify({ projectTitle: project.title, nextTask: nextCard || { title: 'Initial Project Setup', description: 'Scaffold frontend and backend' }, prdReference: prd ? prd.content.slice(0, 500) : '' }, null, 2) }] };
  }

  if (toolName === 'clarifyai_report_agent_activity') {
    notify(userId, 'Live Agent Activity', `Antigravity working on "${args.currentTask}": ${args.activityDetails} (${args.percentComplete || 50}%)`, project._id);
    return { content: [{ type: 'text', text: `Activity logged on ClarifyAI Kanban board for "${args.currentTask}"` }] };
  }

  if (toolName === 'clarifyai_get_project_context') {
    const docs = await Document.find({ projectId: project._id });
    return { content: [{ type: 'text', text: `Project: ${project.title}\n${docs.map(d => `=== ${d.docType} ===\n${d.content}`).join('\n\n')}` }] };
  }

  if (toolName === 'clarifyai_get_kanban_tasks') return { content: [{ type: 'text', text: JSON.stringify(project.kanbanColumns || [], null, 2) }] };

  if (toolName === 'clarifyai_update_task_status' || toolName === 'clarifyai_complete_kanban_task') {
    const targetStatus = toolName === 'clarifyai_complete_kanban_task' ? 'done' : args.status;
    let updated = false;
    (project.kanbanColumns || []).forEach(col => (col.cards || []).forEach(card => {
      if (card.id === args.taskId || card._id?.toString() === args.taskId) { card.status = targetStatus; updated = true; }
    }));
    if (updated) { project.markModified('kanbanColumns'); await project.save(); notify(userId, 'MCP Task Sync', `Task ${args.taskId} set to ${targetStatus}`, project._id); }
    return { content: [{ type: 'text', text: updated ? `Task status set to ${targetStatus}` : 'Task not found.' }] };
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
    const reply = `AI Co-founder advice for "${project.title}": Regarding "${args.question}", align strictly with PRD specs (${prd ? prd.content.slice(0, 300) : 'Standard PRD'}), modular 120-line service architecture, and clean Tailwind glassmorphism design.`;
    notify(userId, 'AI Co-founder Guidance', `AI Agent consulted Co-founder regarding "${args.question}"`, project._id);
    return { content: [{ type: 'text', text: reply }] };
  }

  return { isError: true, content: [{ type: 'text', text: `Unknown tool: ${toolName}` }] };
};

module.exports = { TOOLS_MANIFEST, handleToolCall };
