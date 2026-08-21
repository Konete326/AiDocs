const UIComponent = require('../models/UIComponent');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const sseClients = new Set();

const addSseClient = (res) => {
  sseClients.add(res);
};

const removeSseClient = (res) => {
  sseClients.delete(res);
};

const broadcastSseEvent = (type, data) => {
  const payload = `data: ${JSON.stringify({ type, ...data })}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
};

const getComponentsService = async ({ page = 1, limit = 12, category, framework, creator, search, sort = 'newest', favoritesOnly, favoriteUser }) => {
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.max(1, Math.min(50, parseInt(limit, 10) || 12));
  const query = {};

  if (category && category !== 'All') {
    query.category = new RegExp(`^${category.trim()}$`, 'i');
  }
  if (framework && framework !== 'All') {
    query.framework = new RegExp(`^${framework.trim()}$`, 'i');
  }
  if (creator) query.creator = creator;
  if (favoritesOnly === 'true' && favoriteUser) {
    query.favoritedBy = favoriteUser;
  }
  if (search && search.trim()) {
    const s = search.trim();
    query.$or = [
      { title: new RegExp(s, 'i') },
      { tags: new RegExp(s, 'i') },
      { aiPrompt: new RegExp(s, 'i') }
    ];
  }

  let sortOption = { createdAt: -1 };
  if (sort === 'views') sortOption = { viewsCount: -1, createdAt: -1 };
  if (sort === 'favorites' || sort === 'popular') sortOption = { favoritesCount: -1, viewsCount: -1 };

  if (sort === 'random' || sort === 'randomize') {
    const total = await UIComponent.countDocuments(query);
    const components = await UIComponent.aggregate([
      { $match: query },
      { $sample: { size: l } },
      { $lookup: { from: 'users', localField: 'creator', foreignField: '_id', as: 'creator' } },
      { $unwind: { path: '$creator', preserveNullAndEmptyArrays: true } },
      { $project: { 'creator.passwordHash': 0, 'creator.email': 0, viewsLog: 0 } }
    ]);
    return { components, total, page: p, limit: l, totalPages: Math.max(1, Math.ceil(total / l)) };
  }

  const [components, total] = await Promise.all([
    UIComponent.find(query)
      .select('-viewsLog')
      .sort(sortOption)
      .skip((p - 1) * l)
      .limit(l)
      .populate('creator', 'displayName avatarUrl creatorPoints')
      .lean(),
    UIComponent.countDocuments(query)
  ]);

  return { components, total, page: p, limit: l, totalPages: Math.ceil(total / l) };
};

const getComponentByIdService = async (id, identifier = 'anonymous') => {
  const component = await UIComponent.findById(id).populate('creator', 'displayName avatarUrl creatorPoints followers');
  if (!component) throw new AppError('UI Component not found', 404, 'NOT_FOUND');

  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const existingLog = (component.viewsLog || []).find(
    (log) => log.identifier === String(identifier) && new Date(log.timestamp) > twentyFourHoursAgo
  );

  if (!existingLog) {
    component.viewsCount = (component.viewsCount || 0) + 1;
    if (!component.viewsLog) component.viewsLog = [];
    component.viewsLog.push({ identifier: String(identifier), timestamp: now });
    if (component.viewsLog.length > 50) {
      component.viewsLog = component.viewsLog.slice(-50);
    }
    await component.save();
  }

  return component;
};

const createComponentService = async (data, userId) => {
  const component = await UIComponent.create({ ...data, thumbnail: '', creator: userId });
  await User.findByIdAndUpdate(userId, { $inc: { submittedComponentsCount: 1, creatorPoints: 10 } });
  const populated = await component.populate('creator', 'displayName avatarUrl creatorPoints');
  broadcastSseEvent('COMPONENT_CREATED', { component: populated });
  return populated;
};

const updateComponentService = async (id, data, userId) => {
  const component = await UIComponent.findById(id);
  if (!component) throw new AppError('UI Component not found', 404, 'NOT_FOUND');
  if (component.creator.toString() !== userId.toString()) throw new AppError('Unauthorized to edit component', 403, 'FORBIDDEN');

  const updated = await UIComponent.findByIdAndUpdate(id, data, { new: true }).populate('creator', 'displayName avatarUrl creatorPoints');
  broadcastSseEvent('COMPONENT_UPDATED', { component: updated });
  return updated;
};

const deleteComponentService = async (id, userId) => {
  const component = await UIComponent.findById(id);
  if (!component) throw new AppError('UI Component not found', 404, 'NOT_FOUND');
  if (component.creator.toString() !== userId.toString()) throw new AppError('Unauthorized to delete component', 403, 'FORBIDDEN');

  await UIComponent.findByIdAndDelete(id);
  await User.findByIdAndUpdate(userId, { $inc: { submittedComponentsCount: -1 } });
  broadcastSseEvent('COMPONENT_DELETED', { componentId: id, category: component.category });
  return true;
};

const toggleFavoriteService = async (id, userId) => {
  const component = await UIComponent.findById(id);
  if (!component) throw new AppError('UI Component not found', 404, 'NOT_FOUND');
  const isFavorited = component.favoritedBy.some((favId) => favId.toString() === userId.toString());
  const update = isFavorited
    ? { $pull: { favoritedBy: userId }, $inc: { favoritesCount: -1 } }
    : { $addToSet: { favoritedBy: userId }, $inc: { favoritesCount: 1 } };

  const updatedComponent = await UIComponent.findByIdAndUpdate(id, update, { new: true }).populate('creator', 'displayName avatarUrl creatorPoints');
  return { component: updatedComponent, isFavorited: !isFavorited };
};

const getUserComponentStatsService = async (userId) => {
  const result = await UIComponent.aggregate([
    { $match: { creator: new (require('mongoose').Types.ObjectId)(userId) } },
    { $group: { _id: null, totalViews: { $sum: '$viewsCount' }, totalFavorites: { $sum: '$favoritesCount' }, count: { $sum: 1 } } }
  ]);
  return result[0] || { totalViews: 0, totalFavorites: 0, count: 0 };
};

const recordEmbedViewService = async (id) => {
  await UIComponent.findByIdAndUpdate(id, { $inc: { embedViewsCount: 1 } });
  return true;
};

const getCategoryCountsService = async () => {
  const counts = await UIComponent.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);
  const total = await UIComponent.countDocuments({});

  const result = { All: total };
  counts.forEach((item) => {
    if (item._id) result[item._id] = item.count;
  });
  return result;
};

module.exports = {
  getComponentsService, getComponentByIdService, createComponentService,
  updateComponentService, deleteComponentService, toggleFavoriteService,
  getUserComponentStatsService, recordEmbedViewService, getCategoryCountsService,
  addSseClient, removeSseClient
};
