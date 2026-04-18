const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');
const { Document, Paragraph, TextRun, HeadingLevel, Packer } = require('docx');
const Project = require('../models/Project');
const DocumentModel = require('../models/Document');
const AppError = require('../utils/AppError');

// ─── Path helpers ────────────────────────────────────────────────────────────
const SKILLS_DIR = path.join(__dirname, '../data/skills');
const TEMPLATES_DIR = path.join(__dirname, '../data/templates');

const readSkill = (name) =>
  fs.readFileSync(path.join(SKILLS_DIR, `${name}.md`), 'utf-8');

const readTemplate = (name) =>
  fs.readFileSync(path.join(TEMPLATES_DIR, name), 'utf-8');

// ─── Slug helper ─────────────────────────────────────────────────────────────
const toSlug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// ─── Skills bundled per project type ─────────────────────────────────────────
const TYPE_SKILLS = {
  saas:        ['docx', 'pdf', 'xlsx'],
  ecommerce:   ['docx', 'pdf'],
  marketplace: ['docx', 'pdf'],
  mobile:      ['mobile'],
  ai:          ['claude-api'],
  other:       [],
};

// ─── Scaffold helpers ─────────────────────────────────────────────────────────
const addMernScaffold = (folder, slug, projectTitle) => {
  // backend
  const be = folder.folder('backend');
  const src = be.folder('src');
  ['controllers', 'models', 'routes', 'middleware', 'services', 'utils'].forEach(
    (d) => src.folder(d).file('.gitkeep', '')
  );

  const bePkg = readTemplate('mern-backend-package.json')
    .replace(/{project-name}/g, slug);
  be.file('package.json', bePkg);
  be.file('.env.example', '# Backend environment variables\nPORT=5000\nMONGO_URI=\nJWT_SECRET=\n');
  be.file('server.js', `import express from 'express';\nimport cors from 'cors';\nimport helmet from 'helmet';\nimport dotenv from 'dotenv';\ndotenv.config();\n\nconst app = express();\napp.use(helmet());\napp.use(cors());\napp.use(express.json());\n\napp.get('/api/health', (_req, res) => res.json({ status: 'ok' }));\n\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));\n`);

  // frontend
  const fe = folder.folder('frontend');
  const feSrc = fe.folder('src');
  ['components', 'pages', 'hooks', 'services', 'context', 'styles'].forEach(
    (d) => feSrc.folder(d).file('.gitkeep', '')
  );

  const fePkg = readTemplate('vite-frontend-package.json')
    .replace(/{project-name}/g, slug);
  fe.file('package.json', fePkg);
  fe.file('.env.example', '# Frontend environment variables\nVITE_API_URL=http://localhost:5000/api\n');
  fe.file('vite.config.js', `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n  server: { proxy: { '/api': 'http://localhost:5000' } },\n});\n`);
  fe.file('index.html', `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>${projectTitle}</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>\n`);
};

const addMobileScaffold = (folder, slug) => {
  const lib = folder.folder('lib');
  ['screens', 'widgets', 'services', 'models', 'utils'].forEach(
    (d) => lib.folder(d).file('.gitkeep', '')
  );
  lib.file('main.dart', `import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(const MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: '${slug}',\n      home: const Scaffold(\n        body: Center(child: Text('Hello, World!')),\n      ),\n    );\n  }\n}\n`);

  const pubspec = readTemplate('flutter-pubspec.yaml')
    .replace(/{project_name}/g, slug.replace(/-/g, '_'));
  folder.file('pubspec.yaml', pubspec);
  folder.folder('assets').file('.gitkeep', '');
  folder.folder('test').file('.gitkeep', '');
};

const addAiScaffold = (folder, slug) => {
  const src = folder.folder('src');
  ['agents', 'prompts', 'tools', 'utils'].forEach(
    (d) => src.folder(d).file('.gitkeep', '')
  );
  src.file('main.py', `import os\nfrom dotenv import load_dotenv\n\nload_dotenv()\n\ndef main():\n    print("${slug} AI agent starting...")\n\nif __name__ == "__main__":\n    main()\n`);

  folder.file('requirements.txt', readTemplate('python-requirements.txt'));
  folder.file('.env.example', '# AI project environment variables\nANTHROPIC_API_KEY=\nOPENAI_API_KEY=\n');

  // optional web frontend
  const fe = folder.folder('frontend');
  fe.folder('src').file('.gitkeep', '');
  
  const fePkg = readTemplate('vite-frontend-package.json')
    .replace(/{project-name}/g, slug);
  fe.file('package.json', fePkg);
  fe.file('vite.config.js', `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n});\n`);
};

// ─── Main export ──────────────────────────────────────────────────────────────
exports.generateZip = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  const docs = await DocumentModel.find({ projectId, userId });
  if (!docs.length) throw new AppError('No documents to export', 400, 'NO_DOCS');

  const zip = new JSZip();
  const slug = toSlug(project.title);
  const projectType = project.projectType || 'other';

  // ── 1. Docs folder ──────────────────────────────────────────────────────────
  const docsFolder = zip.folder(`${slug}-docs`);
  docs.forEach((doc) => {
    docsFolder.file(`${doc.docType}.md`, doc.content);
  });

  // ── 2. Skills folder ────────────────────────────────────────────────────────
  const skillsFolder = zip.folder(`${slug}-skills`);

  const extraSkills = TYPE_SKILLS[projectType] || [];
  
  const extraLabels = { 
    docx: 'Word document generation', 
    pdf: 'PDF document generation', 
    xlsx: 'Excel spreadsheet generation', 
    mobile: 'Flutter best practices', 
    'claude-api': 'Anthropic Claude API usage' 
  };
  
  let skillsList = '- `frontend-design/` — UI component patterns and design system rules\n- `skill-creator/` — How to create new skills for this project\n- `find-skills/` — How to discover and use skills effectively\n';
  extraSkills.forEach(name => {
    skillsList += `- \`${name}/\` — ${extraLabels[name] || name}\n`;
  });

  const skillsReadme = readTemplate('skills-readme.md')
    .replace(/{Project Title}/g, project.title)
    .replace(/{projectType}/g, projectType)
    .replace(/{skillsList}/g, skillsList);
    
  skillsFolder.file('SKILLS_README.md', skillsReadme);

  // Default 3 skills (always included)
  ['frontend-design', 'skill-creator', 'find-skills'].forEach((name) => {
    skillsFolder.folder(name).file('SKILL.md', readSkill(name));
  });

  // Project-type specific extra skills
  extraSkills.forEach((name) => {
    skillsFolder.folder(name).file('SKILL.md', readSkill(name));
  });

  // ── 3. Project scaffold folder ──────────────────────────────────────────────
  const projectFolder = zip.folder(`${slug}-project`);

  const readmeContent = readTemplate('project-readme.md')
    .replace(/{Project Title}/g, project.title)
    .replace(/{title}/g, slug)
    .replace(/{project_name}/g, slug.replace(/-/g, '_'));
  projectFolder.file('README.md', readmeContent);

  if (['saas', 'ecommerce', 'marketplace', 'other'].includes(projectType)) {
    addMernScaffold(projectFolder, slug, project.title);
  } else if (projectType === 'mobile') {
    addMobileScaffold(projectFolder, slug);
  } else if (projectType === 'ai') {
    addAiScaffold(projectFolder, slug);
  }

  return { buffer: await zip.generateAsync({ type: 'nodebuffer' }), slug };
};

// ─── PDF export (unchanged) ───────────────────────────────────────────────────
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

// ─── Word export (unchanged) ──────────────────────────────────────────────────
exports.generateWord = async (projectId, docType, userId) => {
  const doc = await DocumentModel.findOne({ projectId, userId, docType });
  if (!doc) throw new AppError('Document not found', 404, 'NOT_FOUND');

  const lines = doc.content.split('\n');
  const children = [];

  lines.forEach((line) => {
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
