const UIComponent = require('../models/UIComponent');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const getComponentsService = async ({ page = 1, limit = 12, category, framework, creator, search, sort = 'newest', favoritesOnly, favoriteUser }) => {
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.max(1, Math.min(50, parseInt(limit, 10) || 12));
  const query = {};

  if (category) query.category = category;
  if (framework) query.framework = framework;
  if (creator) query.creator = creator;
  if (favoritesOnly === 'true' && favoriteUser) {
    query.favoritedBy = favoriteUser;
  }
  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { tags: new RegExp(search, 'i') },
      { aiPrompt: new RegExp(search, 'i') }
    ];
  }

  let sortOption = { createdAt: -1 };
  if (sort === 'views') sortOption = { viewsCount: -1, createdAt: -1 };
  if (sort === 'popular') sortOption = { favoritesCount: -1, viewsCount: -1 };

  const components = await UIComponent.find(query)
    .sort(sortOption)
    .skip((p - 1) * l)
    .limit(l)
    .populate('creator', 'displayName avatarUrl creatorPoints');

  const total = await UIComponent.countDocuments(query);

  return { components, total, page: p, limit: l, totalPages: Math.ceil(total / l) };
};

const getComponentByIdService = async (id) => {
  const component = await UIComponent.findByIdAndUpdate(
    id,
    { $inc: { viewsCount: 1 } },
    { new: true }
  ).populate('creator', 'displayName avatarUrl creatorPoints');
  if (!component) throw new AppError('UI Component not found', 404, 'NOT_FOUND');
  return component;
};

const createComponentService = async (data, userId) => {
  const component = await UIComponent.create({ ...data, creator: userId });
  await User.findByIdAndUpdate(userId, { $inc: { submittedComponentsCount: 1, creatorPoints: 10 } });
  return component.populate('creator', 'displayName avatarUrl creatorPoints');
};

const updateComponentService = async (id, data, userId) => {
  const component = await UIComponent.findById(id);
  if (!component) throw new AppError('UI Component not found', 404, 'NOT_FOUND');
  if (component.creator.toString() !== userId.toString()) throw new AppError('Unauthorized to edit component', 403, 'FORBIDDEN');

  const updated = await UIComponent.findByIdAndUpdate(id, data, { new: true }).populate('creator', 'displayName avatarUrl creatorPoints');
  return updated;
};

const deleteComponentService = async (id, userId) => {
  const component = await UIComponent.findById(id);
  if (!component) throw new AppError('UI Component not found', 404, 'NOT_FOUND');
  if (component.creator.toString() !== userId.toString()) throw new AppError('Unauthorized to delete component', 403, 'FORBIDDEN');

  await UIComponent.findByIdAndDelete(id);
  await User.findByIdAndUpdate(userId, { $inc: { submittedComponentsCount: -1 } });
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

module.exports = {
  getComponentsService, getComponentByIdService, createComponentService,
  updateComponentService, deleteComponentService, toggleFavoriteService,
  getUserComponentStatsService, recordEmbedViewService
};
