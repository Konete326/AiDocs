const asyncWrapper = require('../utils/asyncWrapper');
const chatService = require('../services/chatService');
const AppError = require('../utils/AppError');

exports.sendMessage = asyncWrapper(async (req, res) => {
  const { projectId } = req.params;
  const { messages } = req.body;
  const userId = req.user.id;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    throw new AppError('Messages array required', 400, 'VALIDATION_ERROR');
  }

  const reply = await chatService.sendChatMessage(projectId, userId, messages);
  res.json({ success: true, data: { reply } });
});
