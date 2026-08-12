const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {
  getComponents, getComponentById, createComponent, updateComponent,
  deleteComponent, toggleFavorite, synthesizePrompt, convertFramework,
  getUserComponentStats, recordEmbedView, streamComponentEvents, getCategoryCounts
} = require('../controllers/uiComponentController');

router.get('/stream', streamComponentEvents);
router.get('/category-counts', getCategoryCounts);
router.get('/', getComponents);
router.post('/synthesize-prompt', synthesizePrompt);
router.post('/convert-framework', convertFramework);
router.get('/user-stats/:userId', getUserComponentStats);
router.post('/:id/embed-view', recordEmbedView);
router.get('/:id', getComponentById);
router.post('/', authenticate, createComponent);
router.put('/:id', authenticate, updateComponent);
router.delete('/:id', authenticate, deleteComponent);
router.post('/:id/favorite', authenticate, toggleFavorite);

module.exports = router;
