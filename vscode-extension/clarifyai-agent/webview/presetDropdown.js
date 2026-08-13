function getPresetDropdownScript() {
  return `
    const presetsList = [
      { title: '⚡ Choose AI Preset Prompt...', prompt: '' },
      { title: '🎨 Neumorphic CSS Beautifier', prompt: 'Beautify CSS layout using clean dual-shadow Neumorphic tokens (#E0E5EC background, RGBA shadows).' },
      { title: '📱 Tailwind Responsive Conversion', prompt: 'Refactor HTML/CSS structure into responsive mobile-first Tailwind CSS utility classes.' },
      { title: '⚛️ React Component Refactor', prompt: 'Refactor code into a clean, reusable React component with prop validation and clean state management.' },
      { title: '🔍 Accessibility & WCAG Audit', prompt: 'Audit active workspace HTML for WCAG accessibility compliance, adding proper ARIA attributes and contrast rules.' }
    ];

    function renderPresetDropdownHtml() {
      const optionsHtml = presetsList.map((p, idx) => \`<option value="\${idx}">\${p.title}</option>\`).join('');
      return \`
        <div class="flex items-center gap-2 mb-2 select-none">
          <select id="preset-select" onchange="onPresetSelected()" class="flex-1 neu-inset px-2.5 py-1 text-[11px] font-bold text-[#3D4852] outline-none bg-[#E0E5EC] cursor-pointer">
            \${optionsHtml}
          </select>
          <button onclick="runSelectedPreset()" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer whitespace-nowrap">
            ⚡ Run
          </button>
        </div>
      \`;
    }

    function onPresetSelected() {
      const sel = document.getElementById('preset-select');
      const idx = parseInt(sel.value, 10);
      if (idx > 0 && presetsList[idx]) {
        document.getElementById('prompt-input').value = presetsList[idx].prompt;
      }
    }

    function runSelectedPreset() {
      const input = document.getElementById('prompt-input');
      if (input.value.trim()) {
        sendPrompt();
      }
    }
  `;
}

module.exports = {
  getPresetDropdownScript
};
