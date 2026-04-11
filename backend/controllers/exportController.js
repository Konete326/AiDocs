const asyncWrapper = require('../utils/asyncWrapper');
const exportService = require('../services/exportService');

exports.downloadZip = asyncWrapper(async (req, res) => {
  const { projectId } = req.params;
  const zipBuffer = await exportService.generateZip(projectId, req.user.id);
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="project-documents.zip"');
  res.send(zipBuffer);
});

exports.downloadPdf = asyncWrapper(async (req, res) => {
  const { projectId, docType } = req.params;
  const htmlBuffer = await exportService.generatePdf(projectId, docType, req.user.id);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Disposition', `inline; filename="${docType}.html"`);
  res.send(htmlBuffer);
});

exports.downloadWord = asyncWrapper(async (req, res) => {
  const { projectId, docType } = req.params;
  const wordBuffer = await exportService.generateWord(projectId, docType, req.user.id);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', `attachment; filename="${docType}.docx"`);
  res.send(wordBuffer);
});
