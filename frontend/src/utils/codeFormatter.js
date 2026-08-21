export const formatHtml = (html) => {
  if (!html) return '';
  let formatted = '';
  let indent = 0;

  let clean = html.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
  const tokens = clean.split(/(?=<)|(?<=>)/);

  const voidElements = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr',
    'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'use', 'stop'
  ]);

  tokens.forEach((token) => {
    if (!token.trim()) return;

    if (token.startsWith('</')) {
      indent = Math.max(0, indent - 1);
      formatted += '  '.repeat(indent) + token.trim() + '\n';
    } else if (token.startsWith('<') && !token.startsWith('<!')) {
      const isSelfClosing = token.endsWith('/>');
      const tagNameMatch = token.match(/<([a-zA-Z0-9-]+)/);
      const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';
      const isVoid = voidElements.has(tagName) || isSelfClosing;

      formatted += '  '.repeat(indent) + token.trim() + '\n';
      if (!isVoid && !token.includes('</')) {
        indent++;
      }
    } else {
      formatted += '  '.repeat(indent) + token.trim() + '\n';
    }
  });

  return formatted.trim();
};

export const formatCss = (css) => {
  if (!css) return '';
  let clean = css.replace(/\s+/g, ' ').trim();
  clean = clean.replace(/\s*\{\s*/g, ' {\n  ');
  clean = clean.replace(/\s*;\s*/g, ';\n  ');
  clean = clean.replace(/\s*\}\s*/g, '\n}\n\n');
  return clean.replace(/  \n/g, '').trim();
};

export const formatCode = (html, css) => {
  return {
    formattedHtml: formatHtml(html),
    formattedCss: formatCss(css)
  };
};

export const formatByteSize = (html = '', css = '') => {
  const combined = (html || '') + (css || '');
  if (!combined.trim()) return '0 B';
  const bytes = new Blob([combined]).size;
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
};
