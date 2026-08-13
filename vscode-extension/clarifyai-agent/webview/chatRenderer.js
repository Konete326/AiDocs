const { getCodeBlockActionsScript } = require('./codeBlockActions');
const { getPresetDropdownScript } = require('./presetDropdown');

function getChatRendererHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ClarifyAI Co-founder</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 12px; background-color: #E0E5EC; color: #3D4852; font-family: system-ui, sans-serif; height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
    .neu-card { background-color: #E0E5EC; border-radius: 16px; box-shadow: 4px 4px 8px rgba(163,177,198,0.6), -4px -4px 8px rgba(255,255,255,0.5); border: 1px solid rgba(163,177,198,0.3); }
    .neu-inset { background-color: #E0E5EC; border-radius: 12px; box-shadow: inset 3px 3px 6px rgba(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.5); border: 1px solid rgba(163,177,198,0.2); }
  </style>
</head>
<body>
  <header class="neu-card p-3 flex items-center justify-between mb-2 select-none">
    <div class="flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
      <h2 class="text-xs font-extrabold text-[#3D4852]">ClarifyAI Co-founder</h2>
    </div>
    <span id="file-chip" class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">📄 Workspace</span>
  </header>

  <div id="preset-container"></div>

  <div class="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1 select-none">
    <button onclick="sendQuickAction('Explain Code')" class="px-2.5 py-1 neu-card text-[10px] font-bold text-[#3D4852] hover:text-blue-600 cursor-pointer whitespace-nowrap">💡 Explain Code</button>
    <button onclick="sendQuickAction('Fix CSS / Shadows')" class="px-2.5 py-1 neu-card text-[10px] font-bold text-[#3D4852] hover:text-blue-600 cursor-pointer whitespace-nowrap">🔧 Fix CSS / Shadows</button>
    <button onclick="sendQuickAction('Make Responsive')" class="px-2.5 py-1 neu-card text-[10px] font-bold text-[#3D4852] hover:text-blue-600 cursor-pointer whitespace-nowrap">📱 Make Responsive</button>
  </div>

  <main id="chat-messages" class="flex-1 neu-inset p-3 overflow-y-auto flex flex-col gap-3 text-xs mb-3 font-sans">
    <div class="bg-[#E0E5EC] neu-card p-2.5 text-[11px] text-[#3D4852]">👋 Hi! Select code or pick a quick action to start consultation.</div>
  </main>

  <footer class="flex gap-2">
    <input id="prompt-input" type="text" placeholder="Ask AI Co-founder..." class="flex-1 neu-inset px-3 py-2 text-xs text-[#3D4852] outline-none font-sans" onkeydown="if(event.key==='Enter') sendPrompt()" />
    <button onclick="sendPrompt()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-[3px_3px_6px_rgba(37,99,235,0.3)] cursor-pointer">Send</button>
  </footer>

  <script>
    const vscode = acquireVsCodeApi();
    let currentBubble = null;
    ${getCodeBlockActionsScript()}
    ${getPresetDropdownScript()}

    document.getElementById('preset-container').innerHTML = renderPresetDropdownHtml();

    function sendPrompt() {
      const input = document.getElementById('prompt-input');
      const text = input.value.trim();
      if (!text) return;
      appendMessage('user', text);
      input.value = '';
      vscode.postMessage({ command: 'ACTION_SEND_PROMPT', prompt: text });
    }

    function sendQuickAction(action) {
      appendMessage('user', action);
      vscode.postMessage({ command: 'ACTION_SEND_PROMPT', prompt: action });
    }

    function appendMessage(role, text) {
      const container = document.getElementById('chat-messages');
      const div = document.createElement('div');
      div.className = role === 'user' ? 'self-end bg-blue-600 text-white p-2.5 rounded-xl max-w-[85%] text-[11px] font-medium shadow-sm' : 'self-start neu-card p-2.5 max-w-[90%] text-[11px] text-[#3D4852] font-mono leading-relaxed';
      div.innerText = text;
      container.appendChild(div);
      container.scrollTop = container.scrollHeight;
      if (role === 'ai') currentBubble = div;
    }

    window.addEventListener('message', event => {
      const msg = event.data;
      if (msg.type === 'STREAM_START') {
        if (msg.filename) document.getElementById('file-chip').innerText = '📄 ' + msg.filename;
        appendMessage('ai', '');
      } else if (msg.type === 'STREAM_CHUNK') {
        if (currentBubble) {
          currentBubble.innerText += msg.content;
          document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
        }
      } else if (msg.type === 'STREAM_END') {
        if (currentBubble) attachCodeBlockToolbars(currentBubble, currentBubble.innerText);
      }
    });
  </script>
</body>
</html>`;
}

module.exports = { getChatRendererHtml };
