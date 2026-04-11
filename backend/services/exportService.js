const JSZip = require('jszip');
// marked is an ES Module, so we'll import it dynamically in the function that uses it
// const { marked } = require('marked');
const { Document, Paragraph, TextRun, HeadingLevel, Packer } = require('docx');
const Project = require('../models/Project');
const DocumentModel = require('../models/Document');
const AppError = require('../utils/AppError');

exports.generateZip = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  
  const docs = await DocumentModel.find({ projectId, userId });
  if (!docs.length) throw new AppError('No documents to export', 400, 'NO_DOCS');
  
  const zip = new JSZip();
  const folder = zip.folder(project.title.replace(/[^a-z0-9]/gi, '_'));
  
  docs.forEach(doc => {
    folder.file(`${doc.docType}.md`, doc.content);
  });
  
  return await zip.generateAsync({ type: 'nodebuffer' });
};

exports.generatePdf = async (projectId, docType, userId) => {
  const doc = await DocumentModel.findOne({ projectId, userId, docType });
  if (!doc) throw new AppError('Document not found', 404, 'NOT_FOUND');
  
  const { marked } = await import('marked');
  const html = await marked.parse(doc.content);
  const styledHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6; }
        h1,h2,h3 { color: #111; margin-top: 1.5em; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
        pre { background: #f4f4f4; padding: 16px; border-radius: 6px; overflow-x: auto; font-family: monospace; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th,td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background: #f8f8f8; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body onload="window.print()">${html}</body>
    </html>
  `;
  return Buffer.from(styledHtml, 'utf-8');
};

exports.generateWord = async (projectId, docType, userId) => {
  const doc = await DocumentModel.findOne({ projectId, userId, docType });
  if (!doc) throw new AppError('Document not found', 404, 'NOT_FOUND');
  
  const lines = doc.content.split('\n');
  const children = [];
  
  lines.forEach(line => {
    if (line.startsWith('# ')) {
      children.push(new Paragraph({ text: line.slice(2), heading: HeadingLevel.HEADING_1 }));
    } else if (line.startsWith('## ')) {
      children.push(new Paragraph({ text: line.slice(3), heading: HeadingLevel.HEADING_2 }));
    } else if (line.startsWith('### ')) {
      children.push(new Paragraph({ text: line.slice(4), heading: HeadingLevel.HEADING_3 }));
    } else if (line.trim()) {
      children.push(new Paragraph({ children: [new TextRun(line)] }));
    } else {
      children.push(new Paragraph({ spacing: { after: 200 } }));
    }
  });
  
  const wordDoc = new Document({ sections: [{ children }] });
  return await Packer.toBuffer(wordDoc);
};
