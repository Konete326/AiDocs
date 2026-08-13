const { getAuthHeaders } = require('./authSyncBridge');

const FALLBACK_PRESETS = [
  { id: 'p1', title: 'Neumorphic CSS Beautifier', prompt: 'Beautify CSS layout using clean dual-shadow Neumorphic tokens (#E0E5EC background, RGBA shadows).' },
  { id: 'p2', title: 'Tailwind Responsive Conversion', prompt: 'Refactor HTML/CSS structure into responsive mobile-first Tailwind CSS utility classes.' },
  { id: 'p3', title: 'React Component Refactor', prompt: 'Refactor code into a clean, reusable React component with prop validation and clean state management.' },
  { id: 'p4', title: 'Accessibility & WCAG Audit', prompt: 'Audit active workspace HTML for WCAG accessibility compliance, adding proper ARIA attributes and contrast rules.' }
];

async function fetchUserPresets(apiBaseUrl = 'http://localhost:5000') {
  try {
    const res = await fetch(`${apiBaseUrl}/api/prompts/presets`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.presets && data.presets.length > 0) {
        return data.presets;
      }
    }
    return FALLBACK_PRESETS;
  } catch {
    return FALLBACK_PRESETS;
  }
}

module.exports = {
  fetchUserPresets,
  FALLBACK_PRESETS
};
