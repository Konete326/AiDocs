const User = require('../models/User');
const Document = require('../models/Document');
const Project = require('../models/Project');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');

exports.getMe = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash -refreshTokenHash');
  if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');
  
  res.status(200).json({ success: true, data: user });
});

exports.updateMe = asyncWrapper(async (req, res) => {
  const allowedUpdates = ['displayName', 'avatarUrl'];
  const updates = {};
  
  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new AppError('No valid fields to update', 400, 'BAD_REQUEST');
  }

  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-passwordHash -refreshTokenHash');
  
  res.status(200).json({ success: true, data: user });
});

exports.uploadAvatar = asyncWrapper(async (req, res) => {
  if (!req.file) throw new AppError('Avatar file is required', 400, 'MISSING_FILE');

  const { uploadImage } = require('../services/cloudinaryService');
  
  const result = await uploadImage(req.file.buffer, 'aidocs/avatars', `user_${req.user.id}`);
  
  const user = await User.findByIdAndUpdate(
    req.user.id, 
    { avatarUrl: result.url }, 
    { new: true }
  ).select('-passwordHash -refreshTokenHash');
  
  res.status(200).json({ success: true, data: user });
});

exports.getMyStats = asyncWrapper(async (req, res) => {
  const userId = req.user.id;

  const [projects, documents] = await Promise.all([
    Project.find({ userId, isArchived: false }).select('title docsGenerated chatHistory createdAt').sort({ createdAt: -1 }).limit(6).lean(),
    Document.find({ userId }).select('contentTokenCount modelUsed generationTimeMs').lean(),
  ]);

  const chartData = projects.slice().reverse().map(p => ({
    name: p.title.length > 12 ? p.title.slice(0, 12) + '…' : p.title,
    docs: p.docsGenerated?.length || 0,
  }));

  const totalTokens = documents.reduce((s, d) => s + (d.contentTokenCount || 0), 0);
  const totalDocs = documents.length;

  const totalAiMessages = projects.reduce((s, p) => {
    const assistantMsgs = (p.chatHistory || []).filter(m => m.role === 'assistant').length;
    return s + assistantMsgs;
  }, 0);

  const modelBreakdown = {};
  documents.forEach(d => {
    if (!d.modelUsed) return;
    const short = d.modelUsed.split('/').pop() || d.modelUsed;
    modelBreakdown[short] = (modelBreakdown[short] || 0) + 1;
  });

  const avgGenMs = documents.filter(d => d.generationTimeMs).length
    ? Math.round(documents.filter(d => d.generationTimeMs).reduce((s, d) => s + d.generationTimeMs, 0) / documents.filter(d => d.generationTimeMs).length)
    : 0;

  res.status(200).json({
    success: true,
    data: { chartData, totalTokens, totalDocs, totalAiMessages, modelBreakdown, avgGenMs },
  });
});
