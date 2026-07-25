const express = require('express');
const { downloadZip, downloadPdf, downloadWord, downloadExcel, downloadMd } = require('../controllers/exportController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get(
  '/projects/:projectId/export/zip',
  authenticate,
  downloadZip
);

router.get(
  '/projects/:projectId/export/:docType/pdf',
  authenticate,
  downloadPdf
);

router.get(
  '/projects/:projectId/export/:docType/word',
  authenticate,
  downloadWord
);

router.get(
  '/projects/:projectId/export/:docType/excel',
  authenticate,
  downloadExcel
);

router.get(
  '/projects/:projectId/export/:docType/md',
  authenticate,
  downloadMd
);

module.exports = router;
