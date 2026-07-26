const asyncWrapper = require('../utils/asyncWrapper');
const chatService = require('../services/chatService');
const { broadcastAnnotation } = require('../services/eventBroadcaster');
const AppError = require('../utils/AppError');

const annotationStore = new Map();

exports.submitAnnotations = asyncWrapper(async (req, res) => {
  const { projectId } = req.params;
  const { annotations, pageUrl, schemaVersion } = req.body;
  const userId = req.user.id;

  if (!annotations || !Array.isArray(annotations) || annotations.length === 0) {
    throw new AppError('Annotations array is required', 400, 'VALIDATION_ERROR');
  }

  const projectAnns = annotationStore.get(projectId) || [];
  const processed = annotations.map(ann => ({
    id: ann.id || `ann_${Date.now().toString(36)}`,
    comment: ann.comment || 'UI Visual Fix',
    elementPath: ann.elementPath || ann.elementSelector || 'body',
    timestamp: ann.timestamp || Date.now(),
    x: ann.x || 50,
    y: ann.y || 100,
    element: ann.element || 'element',
    url: ann.url || pageUrl,
    boundingBox: ann.boundingBox || { x: 0, y: 0, width: 0, height: 0 },
    reactComponents: ann.reactComponents || '',
    selectedText: ann.selectedText || '',
    intent: ann.intent || 'fix',
    severity: ann.severity || 'important',
    kind: ann.kind || 'feedback',
    status: ann.status || 'pending',
    thread: ann.thread || []
  }));

  annotationStore.set(projectId, [...projectAnns, ...processed]);

  const formattedItems = processed.map((item, idx) => (
    `### Annotation ${idx + 1} (\`${item.id}\`):
- **Page URL**: ${item.url}
- **Target Path**: \`${item.elementPath}\`
- **React Tree**: ${item.reactComponents || 'N/A'}
- **Selected Text**: "${item.selectedText || ''}"
- **Feedback**: "${item.comment}"
- **Severity**: \`${item.severity}\` | **Kind**: \`${item.kind}\``
  )).join('\n\n');

  const cofounderMessage = `[AGENTATION AFS v${schemaVersion || '1.1'} VISUAL FEEDBACK]
The user submitted ${processed.length} structured annotation(s) on page: ${pageUrl || 'App Route'}.

${formattedItems}

=== AI AGENT INSTRUCTIONS ===
1. Analyze the AFS v1.1 annotations above.
2. Locate the corresponding target components in the codebase.
3. Apply required visual/code fixes and acknowledge/resolve via API.`;

  const reply = await chatService.sendChatMessage(projectId, userId, [
    { role: 'user', content: cofounderMessage }
  ]);

  broadcastAnnotation(projectId, { annotations: processed, reply });

  res.json({
    success: true,
    message: 'AFS v1.1 Annotations processed and sent to AI Agent!',
    data: {
      count: processed.length,
      schemaVersion: schemaVersion || '1.1',
      reply
    }
  });
});

exports.getPendingAnnotations = asyncWrapper(async (req, res) => {
  const { projectId } = req.params;
  const projectAnns = annotationStore.get(projectId) || [];
  const pending = projectAnns.filter(a => a.status === 'pending' || a.status === 'acknowledged');

  res.json({
    success: true,
    count: pending.length,
    annotations: pending
  });
});

exports.updateAnnotationStatus = asyncWrapper(async (req, res) => {
  const { projectId, annId } = req.params;
  const { status, resolvedBy, summary } = req.body;
  const projectAnns = annotationStore.get(projectId) || [];

  const ann = projectAnns.find(a => a.id === annId);
  if (!ann) {
    throw new AppError('Annotation not found', 404, 'NOT_FOUND');
  }

  ann.status = status;
  if (status === 'resolved' || status === 'dismissed') {
    ann.resolvedAt = new Date().toISOString();
    ann.resolvedBy = resolvedBy || 'agent';
  }

  if (summary) {
    ann.thread.push({
      id: `msg_${Date.now()}`,
      role: resolvedBy || 'agent',
      content: summary,
      timestamp: Date.now()
    });
  }

  broadcastAnnotation(projectId, { type: 'annotation.updated', annotation: ann });

  res.json({
    success: true,
    annotation: ann
  });
});

exports.addThreadMessage = asyncWrapper(async (req, res) => {
  const { projectId, annId } = req.params;
  const { role, content } = req.body;
  const projectAnns = annotationStore.get(projectId) || [];

  const ann = projectAnns.find(a => a.id === annId);
  if (!ann) {
    throw new AppError('Annotation not found', 404, 'NOT_FOUND');
  }

  const msg = {
    id: `msg_${Date.now()}`,
    role: role || 'human',
    content,
    timestamp: Date.now()
  };

  ann.thread.push(msg);
  broadcastAnnotation(projectId, { type: 'thread.message', annotationId: annId, message: msg });

  res.json({
    success: true,
    annotation: ann
  });
});
