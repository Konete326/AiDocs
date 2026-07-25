const asyncWrapper = require('../utils/asyncWrapper');
const chatService = require('../services/chatService');
const { broadcastAnnotation } = require('../services/eventBroadcaster');
const AppError = require('../utils/AppError');

exports.submitAnnotations = asyncWrapper(async (req, res) => {
  const { projectId } = req.params;
  const { annotations, pageUrl } = req.body;
  const userId = req.user.id;

  if (!annotations || !Array.isArray(annotations) || annotations.length === 0) {
    throw new AppError('Annotations array is required', 400, 'VALIDATION_ERROR');
  }

  // Format annotations into structured markdown for AI Co-founder
  const formattedItems = annotations.map((item, idx) => (
    `### Annotation ${idx + 1}:
- **Page URL**: ${item.url || pageUrl || 'Unknown'}
- **Target Element**: \`${item.elementSelector || item.tagName || 'Unknown'}\`
- **Text / Inner Content**: "${item.elementText || ''}"
- **User Feedback / Comment**: "${item.comment || ''}"
- **Bounding Box**: ${JSON.stringify(item.bounds || {})}`
  )).join('\n\n');

  const cofounderMessage = `[CLARIFYATION VISUAL ANNOTATION FEEDBACK]
The user submitted ${annotations.length} visual screen feedback item(s) on page: ${pageUrl || 'App Route'}.

${formattedItems}

=== AI CO-FOUNDER INSTRUCTIONS ===
1. Analyze the visual UI feedback items above.
2. Synthesize these into clean technical requirements & actionable fix tasks for Antigravity & Claude Code MCP agents.
3. Suggest a PRD / Kanban update if needed.`;

  // Send message to AI Co-founder chat service
  const reply = await chatService.sendChatMessage(projectId, userId, [
    { role: 'user', content: cofounderMessage }
  ]);

  // Broadcast real-time annotation SSE event
  broadcastAnnotation(projectId, { annotations, reply });

  res.json({
    success: true,
    message: 'Annotations processed and sent to AI Co-founder!',
    data: {
      count: annotations.length,
      reply
    }
  });
});
