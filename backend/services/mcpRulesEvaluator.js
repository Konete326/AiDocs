const LIMITS = {
  component: 80,
  controller: 80,
  service: 120,
  model: 60,
  middleware: 50,
  route: 40,
  utility: 60
};

const evaluateCode = (filePath = '', codeContent = '') => {
  const violations = [];
  const lines = codeContent.split('\n');
  const lineCount = lines.length;

  let fileType = 'utility';
  const lowerPath = filePath.toLowerCase();

  if (lowerPath.endsWith('.jsx') || lowerPath.includes('component')) fileType = 'component';
  else if (lowerPath.includes('controller')) fileType = 'controller';
  else if (lowerPath.includes('service')) fileType = 'service';
  else if (lowerPath.includes('model')) fileType = 'model';
  else if (lowerPath.includes('middleware')) fileType = 'middleware';
  else if (lowerPath.includes('route')) fileType = 'route';

  const maxAllowed = LIMITS[fileType];
  if (lineCount > maxAllowed) {
    violations.push({
      rule: 'File Size Limit',
      severity: 'error',
      message: `File exceeds maximum line limit for ${fileType}. Found ${lineCount} lines, max allowed is ${maxAllowed}.`
    });
  }

  const commentRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;
  const commentMatches = codeContent.match(commentRegex);
  if (commentMatches && commentMatches.length > 0) {
    violations.push({
      rule: 'No Comments Allowed',
      severity: 'error',
      message: `Found ${commentMatches.length} comment(s) in code. Code must contain zero comments.`
    });
  }

  if (codeContent.includes('alert(') || codeContent.includes('confirm(')) {
    violations.push({
      rule: 'No Native Alerts',
      severity: 'error',
      message: 'Detected native alert() or confirm() calls. Use custom theme-aware modals instead.'
    });
  }

  return {
    passed: violations.length === 0,
    fileType,
    lineCount,
    maxAllowedLines: maxAllowed,
    violationsCount: violations.length,
    violations
  };
};

module.exports = { evaluateCode, LIMITS };
