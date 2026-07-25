const { URL } = require('url');

const PRIVATE_HOST_REGEX = /^(?:127\.|10\.|192\.168\.|169\.254\.|0\.0\.0\.0|::1|::|localhost|.*\.local|.*\.internal|.*\.lan)$/i;

const isPrivateHost = (host) => {
  if (PRIVATE_HOST_REGEX.test(host)) return true;

  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)) return true;

  if (/^(?:0x[0-9a-f]+|\d+)$/i.test(host)) return true;

  const parts = host.split('.');
  if (parts.length === 4 && parts.every(p => /^\d+$/.test(p))) {
    const n0 = parseInt(parts[0], 10);
    const n1 = parseInt(parts[1], 10);
    if (n0 === 127 || n0 === 10 || n0 === 0) return true;
    if (n0 === 172 && n1 >= 16 && n1 <= 31) return true;
    if (n0 === 192 && n1 === 168) return true;
    if (n0 === 169 && n1 === 254) return true;
  }

  return false;
};

const sanitizeAndValidateUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  const formatted = trimmed.startsWith('http://') || trimmed.startsWith('https://')
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(formatted);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    if (isPrivateHost(parsed.hostname)) return null;
    return parsed.href;
  } catch {
    return null;
  }
};

module.exports = { sanitizeAndValidateUrl, isPrivateHost };
