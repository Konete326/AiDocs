export const captureComponentSnapshot = async (iframeEl) => {
  try {
    if (!iframeEl || !iframeEl.contentDocument || !iframeEl.contentDocument.body) return '';
    const body = iframeEl.contentDocument.body;
    const width = Math.min(body.scrollWidth || 400, 800);
    const height = Math.min(body.scrollHeight || 300, 600);

    const htmlContent = body.innerHTML;
    const styles = Array.from(iframeEl.contentDocument.querySelectorAll('style'))
      .map(s => s.outerHTML)
      .join('');

    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">${styles}${htmlContent}</div></foreignObject></svg>`;

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        URL.revokeObjectURL(url);
        resolve('');
      }, 400);

      img.onload = () => {
        clearTimeout(timer);
        try {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#E0E5EC';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          URL.revokeObjectURL(url);
          resolve(dataUrl);
        } catch {
          URL.revokeObjectURL(url);
          resolve('');
        }
      };

      img.onerror = () => {
        clearTimeout(timer);
        URL.revokeObjectURL(url);
        resolve('');
      };

      img.src = url;
    });
  } catch {
    return '';
  }
};
