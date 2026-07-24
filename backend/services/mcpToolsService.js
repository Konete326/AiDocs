const Project = require('../models/Project');
const Document = require('../models/Document');
const Notification = require('../models/Notification');
const { evaluateCode } = require('./mcpRulesEvaluator');

const TOOLS_MANIFEST = [
  { name: 'clarifyai_list_user_projects', description: 'List all projects owned by the authenticated user.', inputSchema: { type: 'object', properties: {} } },
  { name: 'clarifyai_get_project_context', description: 'Fetch PRD, SRD, TRD context for project.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_get_kanban_tasks', description: 'Retrieve Kanban tasks for project.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_update_task_status', description: 'Update status of a Kanban task.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' }, taskId: { type: 'string' }, status: { type: 'string' } }, required: ['taskId', 'status'] } },
  { name: 'clarifyai_get_claude_md', description: 'Get CLAUDE.md guidelines for project.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' } } } },
  { name: 'clarifyai_suggest_prd_update', description: 'Append feature updates to PRD.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' }, featureTitle: { type: 'string' }, description: { type: 'string' } }, required: ['featureTitle', 'description'] } },
  { name: 'clarifyai_evaluate_code_rules', description: 'Evaluate code snippets against ClarifyAI rules.', inputSchema: { type: 'object', properties: { filePath: { type: 'string' }, codeContent: { type: 'string' } }, required: ['codeContent'] } },
  { name: 'clarifyai_ask_cofounder', description: 'Consult AI Co-founder for business/technical decision guidance.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' }, question: { type: 'string' } }, required: ['question'] } },
  { name: 'clarifyai_complete_kanban_task', description: 'Auto-complete a task on Kanban board.', inputSchema: { type: 'object', properties: { projectId: { type: 'string' }, taskId: { type: 'string' } }, required: ['taskId'] } }
];

const notify = (userId, title, message, projectId) => {
  Notification.create({ userId, type: 'system', title, message, metadata: { projectId } }).catch(() => {});
};

const resolveProject = (userId, projectId) => projectId ? Project.findOne({ _id: projectId, userId }) : Project.findOne({ userId }).sort({ updatedAt: -1 });

const handleToolCall = async (userId, toolName, args = {}) => {
  if (toolName === 'clarifyai_list_user_projects') {
    const userProjects = await Project.find({ userId, isArchived: { $ne: true } }).select('_id title projectType status updatedAt');
    return { content: [{ type: 'text', text: JSON.stringify(userProjects, null, 2) }] };
  }

  if (toolName === 'clarifyai_evaluate_code_rules') {
    return { content: [{ type: 'text', text: JSON.stringify(evaluateCode(args.filePath, args.codeContent), null, 2) }] };
  }

  const project = await resolveProject(userId, args.projectId);
  if (!project) return { isError: true, content: [{ type: 'text', text: 'Project not found.' }] };

  if (toolName === 'clarifyai_get_project_context') {
    notify(userId, 'MCP Access', `AI Agent accessed project context for "${project.title}"`, project._id);
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
    const reply = `AI Co-founder advice for "${project.title}": Regarding "${args.question}", align with modular 120-line service architecture and clean Tailwind glassmorphism design. Ensure all features are production ready.`;
    notify(userId, 'MCP Co-founder Chat', `AI Agent consulted Co-founder regarding "${args.question}"`, project._id);
    return { content: [{ type: 'text', text: reply }] };
  }

  return { isError: true, content: [{ type: 'text', text: `Unknown tool: ${toolName}` }] };
};

module.exports = { TOOLS_MANIFEST, handleToolCall };
