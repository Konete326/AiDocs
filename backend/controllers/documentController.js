const documentService = require('../services/documentService');
const asyncWrapper = require('../utils/asyncWrapper');

exports.getProjectDocuments = asyncWrapper(async (req, res) => {
  const docs = await documentService.getDocumentsByProject(req.params.projectId, req.user.id);
  res.status(200).json({ success: true, data: docs });
});

exports.getSingleDocument = asyncWrapper(async (req, res) => {
  const doc = await documentService.getSingleDocument(req.params.projectId, req.params.type, req.user.id);
  res.status(200).json({ success: true, data: doc });
});

exports.updateDocument = asyncWrapper(async (req, res) => {
  const doc = await documentService.updateDocument(req.params.projectId, req.params.type, req.user.id, req.body.content);
  res.status(200).json({ success: true, data: doc });
});
