const User = require('../models/User');
const Document = require('../models/Document');
const Project = require('../models/Project');
const UIComponent = require('../models/UIComponent');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');

exports.getMe = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash -refreshTokenHash');
  if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');
  
  res.status(200).json({ success: true, data: user });
});

exports.updateMe = asyncWrapper(async (req, res) => {
  const allowedUpdates = ['displayName', 'avatarUrl', 'bio', 'branding', 'notificationPreferences'];
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

exports.uploadBgImage = asyncWrapper(async (req, res) => {
  if (!req.file) throw new AppError('Background image file is required', 400, 'MISSING_FILE');
  const { uploadBannerImage } = require('../services/cloudinaryService');
  const result = await uploadBannerImage(req.file.buffer, 'aidocs/backgrounds', `bg_${req.user.id}`);
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { bgImageUrl: result.url },
    { new: true }
  ).select('-passwordHash -refreshTokenHash');
  res.status(200).json({ success: true, data: user });
});

exports.getMyStats = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const mongoose = require('mongoose');
  const userObjId = new mongoose.Types.ObjectId(userId);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const [projects, documents, monthlyAgg] = await Promise.all([
    Project.find({ userId, isArchived: false }).select('title docsGenerated chatHistory createdAt').sort({ createdAt: -1 }).limit(6).lean(),
    Document.find({ userId }).select('contentTokenCount modelUsed generationTimeMs').lean(),
    Document.aggregate([
      { $match: { userId: userObjId, createdAt: { $gte: sixMonthsAgo } } },
      { $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        tokens: { $sum: { $ifNull: ['$contentTokenCount', 0] } },
        count: { $sum: 1 },
      }},
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]),
  ]);

  const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now = new Date();
  const monthlyTokens = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const yr = d.getFullYear();
    const mo = d.getMonth() + 1;
    const found = monthlyAgg.find(a => a._id.year === yr && a._id.month === mo);
    return { month: `${MONTH_SHORT[mo - 1]} ${String(yr).slice(2)}`, tokens: found?.tokens || 0, docs: found?.count || 0 };
  });

  const totalTokens = documents.reduce((s, d) => s + (d.contentTokenCount || 0), 0);
  const totalDocs = documents.length;

  const totalAiMessages = projects.reduce((s, p) => {
    return s + (p.chatHistory || []).filter(m => m.role === 'assistant').length;
  }, 0);

  const modelBreakdown = {};
  documents.forEach(d => {
    if (!d.modelUsed) return;
    const short = d.modelUsed.split('/').pop() || d.modelUsed;
    modelBreakdown[short] = (modelBreakdown[short] || 0) + 1;
  });

  const genDocs = documents.filter(d => d.generationTimeMs);
  const avgGenMs = genDocs.length
    ? Math.round(genDocs.reduce((s, d) => s + d.generationTimeMs, 0) / genDocs.length)
    : 0;

  const docsPerProject = projects.slice().reverse().map(p => ({
    name: p.title.length > 12 ? p.title.slice(0, 12) + '\u2026' : p.title,
    docs: p.docsGenerated?.length || 0,
  }));

  res.status(200).json({
    success: true,
    data: { monthlyTokens, docsPerProject, totalTokens, totalDocs, totalAiMessages, modelBreakdown, avgGenMs },
  });
});

exports.getUserPublicProfile = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id).select('displayName avatarUrl bgImageUrl bio creatorPoints createdAt role followers following');
  if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');

  const higherRanked = await User.countDocuments({
    $or: [
      { creatorPoints: { $gt: user.creatorPoints || 0 } },
      { creatorPoints: user.creatorPoints || 0, _id: { $lt: user._id } }
    ]
  });

  const rank = higherRanked + 1;

  res.status(200).json({
    success: true,
    data: {
      ...user.toObject(),
      rank
    }
  });
});

exports.toggleFollowUser = asyncWrapper(async (req, res) => {
  const targetUserId = req.params.id;
  const currentUserId = req.user.id;

  if (targetUserId === currentUserId) {
    throw new AppError('You cannot follow yourself.', 400, 'BAD_REQUEST');
  }

  const targetUser = await User.findById(targetUserId);
  const currentUser = await User.findById(currentUserId);

  if (!targetUser || !currentUser) {
    throw new AppError('User not found', 404, 'NOT_FOUND');
  }

  const isFollowing = (currentUser.following || []).some(id => id.toString() === targetUserId);

  if (isFollowing) {
    currentUser.following.pull(targetUserId);
    targetUser.followers.pull(currentUserId);
  } else {
    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);
  }

  await currentUser.save();
  await targetUser.save();

  res.status(200).json({
    success: true,
    data: {
      isFollowing: !isFollowing,
      followersCount: targetUser.followers.length
    }
  });
});

exports.getUserSocialNetwork = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('followers', 'displayName avatarUrl bio creatorPoints createdAt role followers')
    .populate('following', 'displayName avatarUrl bio creatorPoints createdAt role followers');

  if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');

  res.status(200).json({
    success: true,
    data: {
      user: {
        _id: user._id,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        creatorPoints: user.creatorPoints
      },
      followers: user.followers || [],
      following: user.following || []
    }
  });
});

exports.getLeaderboard = asyncWrapper(async (req, res) => {
  const period = req.query.period || 'all';

  if (period === 'week' || period === 'month') {
    const days = period === 'week' ? 7 : 30;
    const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const stats = await UIComponent.aggregate([
      { $match: { createdAt: { $gte: sinceDate } } },
      {
        $group: {
          _id: '$creator',
          recentCount: { $sum: 1 },
          recentPoints: { $sum: 10 }
        }
      },
      { $sort: { recentPoints: -1, recentCount: -1 } },
      { $limit: 100 }
    ]);

    const creatorIds = stats.map((s) => s._id);
    const users = await User.find({ _id: { $in: creatorIds } }).select('displayName avatarUrl bio creatorPoints submittedComponentsCount followers createdAt role');

    const userMap = new Map(users.map((u) => [String(u._id), u]));

    let rankCounter = 1;
    const formatted = stats
      .map((s) => {
        const u = userMap.get(String(s._id));
        if (!u) return null;
        return {
          ...u.toObject(),
          creatorPoints: s.recentPoints,
          submittedComponentsCount: s.recentCount,
          rank: rankCounter++,
          followersCount: u.followers?.length || 0
        };
      })
      .filter(Boolean);

    if (formatted.length < 100) {
      const existingIds = new Set(formatted.map((u) => String(u._id)));
      const fallbackUsers = await User.find({ _id: { $nin: Array.from(existingIds) } })
        .sort({ creatorPoints: -1 })
        .limit(100 - formatted.length)
        .select('displayName avatarUrl bio creatorPoints submittedComponentsCount followers createdAt role');

      fallbackUsers.forEach((u) => {
        formatted.push({
          ...u.toObject(),
          creatorPoints: 0,
          submittedComponentsCount: 0,
          rank: rankCounter++,
          followersCount: u.followers?.length || 0
        });
      });
    }

    return res.status(200).json({ success: true, data: formatted });
  }

  const users = await User.find({})
    .sort({ creatorPoints: -1, submittedComponentsCount: -1 })
    .limit(100)
    .select('displayName avatarUrl bio creatorPoints submittedComponentsCount followers createdAt role');

  const formatted = users.map((u, idx) => ({
    ...u.toObject(),
    rank: idx + 1,
    followersCount: u.followers?.length || 0
  }));

  res.status(200).json({ success: true, data: formatted });
});
