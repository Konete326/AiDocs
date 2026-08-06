export const formatHtml = (html) => {
  if (!html) return '';
  let formatted = '';
  let indent = 0;
  const tokens = html.replace(/>\s*</g, '><').split(/(?=<)|(?<=>)/);

  tokens.forEach((token) => {
    if (!token.trim()) return;
    if (token.startsWith('</')) {
      indent = Math.max(0, indent - 1);
      formatted += '  '.repeat(indent) + token.trim() + '\n';
    } else if (token.startsWith('<') && !token.startsWith('<!') && !token.endsWith('/>') && !token.includes('</')) {
      formatted += '  '.repeat(indent) + token.trim() + '\n';
      const isSelfClosing = token.match(/<(img|input|br|hr|meta|link)\b/i);
      if (!isSelfClosing) indent++;
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
