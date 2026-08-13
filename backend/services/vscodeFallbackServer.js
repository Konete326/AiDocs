const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs').promises;

let fallbackHttpServer = null;

const sanitizePath = (raw) => {
  if (!raw) return '';
  try { return path.normalize(decodeURIComponent(raw)); } catch { return ''; }
};

const renderEditorHtml = (folder, htmlContent, cssContent, metadata) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>VS Code Web Studio - ${metadata.title || 'Component'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; background-color: #1E1E1E; color: #CCCCCC; font-family: system-ui, sans-serif; height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
    .vs-bg { background-color: #181818; } .vs-side { background-color: #252526; } .vs-editor { background-color: #1E1E1E; } .vs-border { border-color: #333333; } .vs-active { background-color: #37373D; color: #FFFFFF; }
    textarea { tab-size: 2; resize: none; outline: none; }
  </style>
</head>
<body>
  <header class="vs-bg h-9 px-3 flex items-center justify-between border-b vs-border text-xs text-[#CCCCCC] select-none">
    <div class="flex items-center gap-2 font-semibold">
      <span class="text-blue-400 font-bold">VS Code Web</span><span class="text-gray-500">/</span><span class="text-gray-200 font-extrabold">${metadata.title || 'Workspace'}</span>
    </div>
    <div class="flex items-center gap-3">
      <button onclick="togglePreview()" class="px-2 py-0.5 rounded bg-[#252526] hover:bg-[#37373D] text-[11px] font-mono text-gray-300 border vs-border cursor-pointer flex items-center gap-1"><span>👁️ Toggle Preview</span></button>
      <div id="status" class="text-[11px] text-emerald-400 font-mono font-bold flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span>Auto-Sync (Ctrl+S)</span></div>
    </div>
  </header>

  <div class="flex-1 flex overflow-hidden">
    <aside class="w-52 vs-side border-r vs-border p-3 flex flex-col gap-2 select-none flex-shrink-0">
      <div class="text-[11px] font-bold uppercase text-gray-400 px-1 mb-1 tracking-wider">Explorer</div>
      <button id="tab-html" onclick="switchTab('html')" class="w-full text-left px-2.5 py-1.5 rounded text-xs font-mono vs-active flex items-center justify-between"><span>📄 index.html</span></button>
      <button id="tab-css" onclick="switchTab('css')" class="w-full text-left px-2.5 py-1.5 rounded text-xs font-mono text-gray-400 hover:bg-[#2A2D2E] flex items-center justify-between"><span>🎨 styles.css</span></button>
      <div class="mt-auto p-2 bg-[#1E1E1E] rounded border vs-border text-[11px] text-gray-400 font-mono"><div class="text-blue-400 font-bold">clarifyai.json</div><div>Framework: ${metadata.framework || 'React'}</div></div>
    </aside>

    <main id="main-container" class="flex-1 flex vs-editor overflow-hidden relative">
      <div id="code-panel" class="w-1/2 flex flex-col border-r vs-border overflow-hidden">
        <div class="vs-bg px-3 py-1 text-xs font-mono border-b vs-border text-blue-400 font-bold flex justify-between items-center"><span id="file-label">index.html</span><span class="text-[10px] text-gray-400">Ctrl+S</span></div>
        <textarea id="editor" class="w-full flex-1 vs-editor p-3 font-mono text-xs text-emerald-300 border-0" oninput="onCodeChange()">${htmlContent}</textarea>
      </div>
      <div id="resizer" class="w-2 vs-bg hover:bg-blue-500 active:bg-blue-600 cursor-col-resize flex-shrink-0 transition-colors z-20 border-x vs-border"></div>
      <div id="preview-panel" class="w-1/2 flex flex-col vs-bg overflow-hidden">
        <div class="vs-bg px-3 py-1 text-xs font-mono border-b vs-border text-gray-400 font-bold">Real-time Stage Preview</div>
        <iframe id="preview" class="w-full flex-1 border-0 bg-white"></iframe>
      </div>
    </main>
  </div>

  <script>
    let currentTab = 'html', codeHtml = ${JSON.stringify(htmlContent)}, codeCss = ${JSON.stringify(cssContent)}, folderPath = ${JSON.stringify(folder)}, isPreviewVisible = true, isDragging = false;
    function updatePreview() { document.getElementById('preview').srcdoc = '<!DOCTYPE html><html><head><style>' + codeCss + '</style></head><body>' + codeHtml + '</body></html>'; }
    function switchTab(tab) {
      currentTab = tab;
      const editor = document.getElementById('editor'), label = document.getElementById('file-label'), tabHtml = document.getElementById('tab-html'), tabCss = document.getElementById('tab-css');
      if (tab === 'html') { editor.value = codeHtml; editor.className = 'w-full flex-1 vs-editor p-3 font-mono text-xs text-emerald-300 border-0'; label.innerText = 'index.html'; tabHtml.className = 'w-full text-left px-2.5 py-1.5 rounded text-xs font-mono vs-active flex items-center justify-between'; tabCss.className = 'w-full text-left px-2.5 py-1.5 rounded text-xs font-mono text-gray-400 hover:bg-[#2A2D2E] flex items-center justify-between'; }
      else { editor.value = codeCss; editor.className = 'w-full flex-1 vs-editor p-3 font-mono text-xs text-cyan-300 border-0'; label.innerText = 'styles.css'; tabCss.className = 'w-full text-left px-2.5 py-1.5 rounded text-xs font-mono vs-active flex items-center justify-between'; tabHtml.className = 'w-full text-left px-2.5 py-1.5 rounded text-xs font-mono text-gray-400 hover:bg-[#2A2D2E] flex items-center justify-between'; }
    }
    function togglePreview() {
      isPreviewVisible = !isPreviewVisible;
      const p = document.getElementById('preview-panel'), r = document.getElementById('resizer'), c = document.getElementById('code-panel');
      if (!isPreviewVisible) { p.style.display = 'none'; r.style.display = 'none'; c.style.width = '100%'; }
      else { p.style.display = 'flex'; r.style.display = 'block'; c.style.width = '50%'; p.style.width = '50%'; }
    }
    function saveDisk() { fetch('/api/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ folder: folderPath, html: codeHtml, css: codeCss }) }).catch(() => {}); }
    function onCodeChange() { const val = document.getElementById('editor').value; if (currentTab === 'html') codeHtml = val; else codeCss = val; updatePreview(); saveDisk(); }
    document.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveDisk(); const st = document.getElementById('status'); st.innerText = 'Synced (Ctrl+S)'; setTimeout(() => { st.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Auto-Sync (Ctrl+S)'; }, 1000); } });

    const resizer = document.getElementById('resizer'), main = document.getElementById('main-container'), codePanel = document.getElementById('code-panel'), previewPanel = document.getElementById('preview-panel');
    resizer.addEventListener('mousedown', (e) => { isDragging = true; document.body.style.cursor = 'col-resize'; e.preventDefault(); });
    document.addEventListener('mousemove', (e) => {
      if (!isDragging || !isPreviewVisible) return;
      const rect = main.getBoundingClientRect();
      let pct = ((e.clientX - rect.left) / rect.width) * 100;
      if (pct < 15) pct = 15; if (pct > 85) pct = 85;
      codePanel.style.width = pct + '%'; previewPanel.style.width = (100 - pct) + '%';
    });
    document.addEventListener('mouseup', () => { isDragging = false; document.body.style.cursor = 'default'; });
    updatePreview();
  </script>
</body>
</html>`;

const startFallbackServer = (port = 8080) => new Promise((resolve) => {
  if (fallbackHttpServer) return resolve(true);

  fallbackHttpServer = http.createServer(async (req, res) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');
      res.setHeader('Content-Security-Policy', "frame-ancestors * 'self' http://localhost:* http://127.0.0.1:*");
      if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

      const parsedUrl = url.parse(req.url, true);
      if (req.method === 'POST' && parsedUrl.pathname === '/api/save') {
        let body = ''; req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body), targetFolder = sanitizePath(data.folder);
            if (targetFolder) { await fs.writeFile(path.join(targetFolder, 'index.html'), data.html || '', 'utf8'); await fs.writeFile(path.join(targetFolder, 'styles.css'), data.css || '', 'utf8'); }
            res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ success: true }));
          } catch { res.writeHead(500); res.end(JSON.stringify({ success: false })); }
        });
        return;
      }
      const folder = sanitizePath(parsedUrl.query.folder);
      let htmlContent = '', cssContent = '', metadata = {};
      if (folder) {
        try { htmlContent = await fs.readFile(path.join(folder, 'index.html'), 'utf8'); } catch {}
        try { cssContent = await fs.readFile(path.join(folder, 'styles.css'), 'utf8'); } catch {}
        try { metadata = JSON.parse(await fs.readFile(path.join(folder, 'clarifyai.json'), 'utf8')); } catch {}
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(renderEditorHtml(folder, htmlContent, cssContent, metadata));
    } catch { res.writeHead(500); res.end('Server Error'); }
  });

  fallbackHttpServer.listen(port, '0.0.0.0', () => resolve(true));
  fallbackHttpServer.on('error', () => resolve(false));
});

module.exports = { startFallbackServer };
