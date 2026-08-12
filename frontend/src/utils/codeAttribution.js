export const getAttributionComment = (creatorName = 'Founder', type = 'html', componentId = '') => {
  const author = creatorName || 'Founder';
  let url = '';
  if (componentId) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://clarifyai.app';
    url = ` (${origin}/components/${componentId})`;
  } else if (typeof window !== 'undefined' && window.location.href && window.location.href.includes('/components/')) {
    url = ` (${window.location.href})`;
  }

  if (type === 'css') {
    return `/* From ClarifyAI by ${author}${url} */\n`;
  }
  return `<!-- From ClarifyAI by ${author}${url} -->\n`;
};

export const attachAttributionToCode = (code, creatorName = 'Founder', type = 'html', componentId = '') => {
  if (!code) return '';
  const comment = getAttributionComment(creatorName, type, componentId);
  if (code.startsWith('<!-- From ClarifyAI') || code.startsWith('/* From ClarifyAI')) {
    return code;
  }
  return comment + code;
};
