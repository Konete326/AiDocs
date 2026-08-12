const {
  getComponentsService, getComponentByIdService, createComponentService,
  updateComponentService, deleteComponentService, toggleFavoriteService,
  getUserComponentStatsService, recordEmbedViewService, getCategoryCountsService,
  addSseClient, removeSseClient
} = require('../services/uiComponentService');
const { synthesizePromptService, convertFrameworkService } = require('../services/uiPromptSynthesizer');
const AppError = require('../utils/AppError');

const getComponents = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await getComponentsService(req.query) }); } catch (err) { next(err); }
};

const getComponentById = async (req, res, next) => {
  try {
    const identifier = req.user?.id || req.ip || req.headers['x-forwarded-for'] || 'anonymous';
    res.status(200).json({ success: true, data: await getComponentByIdService(req.params.id, identifier) });
  } catch (err) { next(err); }
};

const createComponent = async (req, res, next) => {
  try {
    const { title, category, code, aiPrompt, framework, tags, thumbnail } = req.body;
    if (!title || !category || !aiPrompt) return next(new AppError('Title, category, and AI prompt required.', 400, 'MISSING_FIELDS'));
    res.status(201).json({ success: true, data: await createComponentService({ title, category, code, aiPrompt, framework, tags, thumbnail }, req.user.id) });
  } catch (err) { next(err); }
};

const updateComponent = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await updateComponentService(req.params.id, req.body, req.user.id) }); } catch (err) { next(err); }
};

const deleteComponent = async (req, res, next) => {
  try { await deleteComponentService(req.params.id, req.user.id); res.status(200).json({ success: true, message: 'Deleted' }); } catch (err) { next(err); }
};

const toggleFavorite = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await toggleFavoriteService(req.params.id, req.user.id) }); } catch (err) { next(err); }
};

const synthesizePrompt = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: { aiPrompt: await synthesizePromptService(req.body.html, req.body.css) } }); } catch (err) { next(err); }
};

const convertFramework = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await convertFrameworkService(req.body.html, req.body.css) }); } catch (err) { next(err); }
};

const getUserComponentStats = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await getUserComponentStatsService(req.params.userId) }); } catch (err) { next(err); }
};

const recordEmbedView = async (req, res, next) => {
  try { await recordEmbedViewService(req.params.id); res.status(200).json({ success: true }); } catch (err) { next(err); }
};

const getCategoryCounts = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await getCategoryCountsService() }); } catch (err) { next(err); }
};

const streamComponentEvents = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  if (res.flushHeaders) res.flushHeaders();

  res.write(`data: ${JSON.stringify({ type: 'CONNECTED' })}\n\n`);
  addSseClient(res);

  req.on('close', () => {
    removeSseClient(res);
  });
};

module.exports = {
  getComponents, getComponentById, createComponent, updateComponent, deleteComponent,
  toggleFavorite, synthesizePrompt, convertFramework, getUserComponentStats, recordEmbedView,
  getCategoryCounts, streamComponentEvents
};
