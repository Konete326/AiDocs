function getCodeBlockActionsScript() {
  return `
    function attachCodeBlockToolbars(bubbleElement, codeSnippet) {
      if (!bubbleElement || !codeSnippet) return;

      const toolbar = document.createElement('div');
      toolbar.className = 'flex items-center gap-1.5 mt-2.5 pt-2 border-t border-[#A3B1C6]/30 select-none';

      toolbar.innerHTML = \`
        <button onclick="handleCodeAction('ACTION_APPLY_CODE', \\\`\${escapeJs(codeSnippet)}\\\`)" class="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1">
          <span>⚡ Apply to File</span>
        </button>
        <button onclick="handleCodeAction('ACTION_OPEN_DIFF', \\\`\${escapeJs(codeSnippet)}\\\`)" class="px-2.5 py-1 neu-card text-[#3D4852] font-bold text-[10px] rounded-xl hover:text-blue-600 active:scale-95 transition-all cursor-pointer flex items-center gap-1">
          <span>🔍 Review Diff</span>
        </button>
        <button onclick="handleCodeAction('ACTION_INSERT_CURSOR', \\\`\${escapeJs(codeSnippet)}\\\`)" class="px-2.5 py-1 neu-card text-[#3D4852] font-bold text-[10px] rounded-xl hover:text-blue-600 active:scale-95 transition-all cursor-pointer flex items-center gap-1">
          <span>🎯 Insert at Cursor</span>
        </button>
      \`;

      bubbleElement.appendChild(toolbar);
    }

    function escapeJs(str) {
      return (str || '').replace(/\\\\/g, '\\\\\\\\').replace(/\`/g, '\\\\\`').replace(/\\\$/g, '\\\\\$');
    }

    function handleCodeAction(actionCommand, snippet) {
      vscode.postMessage({ command: actionCommand, code: snippet });
    }
  `;
}

module.exports = {
  getCodeBlockActionsScript
};
