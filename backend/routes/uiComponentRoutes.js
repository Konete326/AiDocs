const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {
  getComponents, getComponentById, createComponent, updateComponent,
  deleteComponent, toggleFavorite, synthesizePrompt, convertFramework,
  getUserComponentStats, recordEmbedView, streamComponentEvents, getCategoryCounts
} = require('../controllers/uiComponentController');

const cacheControl = (maxAge = 60, swr = 120) => (req, res, next) => {
  if (req.method === 'GET') {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}, stale-while-revalidate=${swr}`);
  }
  next();
};

router.get('/stream', streamComponentEvents);
router.get('/category-counts', cacheControl(60, 120), getCategoryCounts);
router.get('/', cacheControl(30, 60), getComponents);
router.post('/synthesize-prompt', synthesizePrompt);
router.post('/convert-framework', convertFramework);
router.get('/user-stats/:userId', getUserComponentStats);
router.post('/:id/embed-view', recordEmbedView);
router.get('/:id', cacheControl(60, 120), getComponentById);
router.post('/', authenticate, createComponent);
router.put('/:id', authenticate, updateComponent);
router.delete('/:id', authenticate, deleteComponent);
router.post('/:id/favorite', authenticate, toggleFavorite);

module.exports = router;
