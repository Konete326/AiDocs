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
  const be = folder.folder('backend');
  const beSrc = be.folder('src');
  ['controllers', 'models', 'routes', 'middleware', 'services', 'utils'].forEach(
    (d) => beSrc.folder(d).file('.gitkeep', '')
  );

  const bePkg = readTemplate('mern-backend-package.json').replace(/{project-name}/g, slug);
  be.file('package.json', bePkg);
  be.file('.env.example', 'PORT=5000\nMONGO_URI=mongodb://localhost:27017/{project-name}\nJWT_SECRET=your_jwt_secret_here\n'.replace(/{project-name}/g, slug));
  be.file('server.js',
`import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch(console.error);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
`);

  const fe = folder.folder('frontend');
  const feSrc = fe.folder('src');
  ['components', 'pages', 'hooks', 'services', 'context'].forEach(
    (d) => feSrc.folder(d).file('.gitkeep', '')
  );

  const fePkg = readTemplate('vite-frontend-package.json').replace(/{project-name}/g, slug);
  fe.file('package.json', fePkg);
  fe.file('.env.example', 'VITE_API_URL=http://localhost:5000/api\n');
  fe.file('vite.config.js',
`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: { '/api': 'http://localhost:5000' } },
});
`);
  fe.file('index.html',
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectTitle}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`);
  feSrc.file('main.jsx',
`import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
`);
  feSrc.file('App.jsx',
`import { Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">${projectTitle}</h1>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
`);
  feSrc.file('index.css',
`@import "tailwindcss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
`);
  feSrc.file('api.js',
`import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

export default api;
`);
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
  src.file('main.py',
`import os
from dotenv import load_dotenv

load_dotenv()

def main():
    print(f"${slug} AI agent starting...")

if __name__ == "__main__":
    main()
`);

  folder.file('requirements.txt', readTemplate('python-requirements.txt'));
  folder.file('.env.example', 'ANTHROPIC_API_KEY=\nOPENAI_API_KEY=\nGEMINI_API_KEY=\n');

  const fe = folder.folder('frontend');
  const feSrc = fe.folder('src');
  ['components', 'pages', 'hooks'].forEach((d) => feSrc.folder(d).file('.gitkeep', ''));

  const fePkg = readTemplate('vite-frontend-package.json').replace(/{project-name}/g, slug);
  fe.file('package.json', fePkg);
  fe.file('vite.config.js',
`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
`);
  feSrc.file('index.css', '@import "tailwindcss";\n');
  feSrc.file('main.jsx',
`import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
`);
  feSrc.file('App.jsx', `export default function App() { return <h1 className="text-2xl font-bold p-8">${slug}</h1>; }\n`);
  fe.file('index.html',
`<!DOCTYPE html>
<html lang="en">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${slug}</title></head>
  <body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>
`);
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
    .replace(/\{Project Title\}/gi, project.title)
    .replace(/\{project_title\}/gi, project.title)
    .replace(/\{title\}/g, slug)
    .replace(/\{project_name\}/g, slug)
    .replace(/\{projectType\}/g, project.projectType || 'other');
  projectFolder.file('README.md', readmeContent);

  if (['saas', 'ecommerce', 'marketplace', 'other'].includes(projectType)) {
    addMernScaffold(projectFolder, slug, project.title);
  } else if (projectType === 'mobile') {
    addMobileScaffold(projectFolder, slug);
  } else if (projectType === 'ai') {
    addAiScaffold(projectFolder, slug);
  }

  let rulesContent = '';
  try {
    const rulesPath = path.join(__dirname, '../../AGENT_RULES.md');
    rulesContent = fs.readFileSync(rulesPath, 'utf-8');
    rulesContent = rulesContent.replace(/\[date of project generation\]/g, new Date().toLocaleDateString());
  } catch (err) {
    rulesContent = '# Agent Rules\nSee clarifyai.vercel.app for agent rules.';
  }
  zip.file('AGENT_RULES.md', rulesContent);

  return { buffer: await zip.generateAsync({ type: 'nodebuffer' }), slug };
};

const getSkillsDocContent = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, userId });
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');
  
  const { ALL_SKILLS } = require('../controllers/skillsController');
  const projectType = project.projectType || 'other';
  
  // Filter skills: 1. Default for project type, 2. Manual/Custom skills
  const skills = ALL_SKILLS.filter(s =>
    s.forTypes.includes('all') || 
    s.forTypes.includes(projectType) ||
    (project.customSkills && project.customSkills.includes(s.id))
  );

  let content = `# Project Skills: ${project.title}\n\n`;
  content += `Copy and run these commands in your terminal to empower your AI assistant for this project.\n\n`;
  content += `\`\`\`bash\n`;
  skills.forEach(s => {
    content += `${s.command}\n`;
  });
  content += `\`\`\`\n\n`;
  
  content += `## Details\n\n`;
  skills.forEach(s => {
    content += `### ${s.name}\n${s.description}\n\n---\n\n`;
  });
  
  return content;
};

// ─── PDF export (unchanged) ───────────────────────────────────────────────────
exports.generatePdf = async (projectId, docType, userId) => {
  let content = '';
  if (docType === 'skills') {
    content = await getSkillsDocContent(projectId, userId);
  } else {
    const doc = await DocumentModel.findOne({ projectId, userId, docType });
    if (!doc) throw new AppError('Document not found', 404, 'NOT_FOUND');
    content = doc.content;
  }

  const { marked } = await import('marked');
  const html = await marked.parse(content);
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
  let content = '';
  if (docType === 'skills') {
    content = await getSkillsDocContent(projectId, userId);
  } else {
    const doc = await DocumentModel.findOne({ projectId, userId, docType });
    if (!doc) throw new AppError('Document not found', 404, 'NOT_FOUND');
    content = doc.content;
  }

  const lines = content.split('\n');
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
