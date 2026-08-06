export const validateCode = (html, css) => {
  const errors = [];

  if (html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<!DOCTYPE html><html><body>${html}</body></html>`, 'text/html');
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      errors.push({ type: 'html', message: 'HTML syntax error: Invalid tag structure.' });
    } else {
      const openTags = (html.match(/<[a-z1-6]+(?:\s+[^>]*[^\/])?>/gi) || []).length;
      const selfClosing = (html.match(/<[a-z1-6]+[^>]*\/>/gi) || []).length;
      const closeTags = (html.match(/<\/[a-z1-6]+>/gi) || []).length;
      const selfVoid = (html.match(/<(img|input|br|hr|meta|link)\b[^>]*>/gi) || []).length;
      if (openTags > closeTags + selfClosing + selfVoid) {
        errors.push({ type: 'html', message: 'Warning: Possible unclosed HTML tag.' });
      }
    }
  }

  if (css) {
    const openBraces = (css.match(/\{/g) || []).length;
    const closeBraces = (css.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push({ type: 'css', message: `CSS syntax error: Unmatched braces (${openBraces} '{' vs ${closeBraces} '}').` });
    }
  }

  return errors;
};
