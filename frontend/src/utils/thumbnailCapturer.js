export const captureComponentSnapshot = async (iframeEl) => {
  try {
    if (!iframeEl || !iframeEl.contentDocument || !iframeEl.contentDocument.body) return '';
    const doc = iframeEl.contentDocument;
    const body = doc.body;
    const width = Math.max(body.scrollWidth || 500, 500);
    const height = Math.max(body.scrollHeight || 320, 320);

    const htmlContent = body.innerHTML;
    const styles = Array.from(doc.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((s) => s.outerHTML)
      .join('');

    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
            * { box-sizing: border-box; }
            body { margin: 0; padding: 12px; background-color: #E0E5EC; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
            #wrapper { display: flex; align-items: center; justify-content: center; width: max-content; height: max-content; margin: auto; }
          </style>
          ${styles}
          <div id="wrapper">
            ${htmlContent}
          </div>
        </div>
      </foreignObject>
    </svg>`;

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
      const scale = 2;
      const timer = setTimeout(() => {
        URL.revokeObjectURL(url);
        resolve('');
      }, 500);

      img.onload = () => {
        clearTimeout(timer);
        try {
          const canvas = document.createElement('canvas');
          canvas.width = width * scale;
          canvas.height = height * scale;
          const ctx = canvas.getContext('2d');
          ctx.scale(scale, scale);
          ctx.fillStyle = '#E0E5EC';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/png', 0.92);
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

export const captureThumbnailFromHtmlCss = async (html, css) => {
  try {
    const width = 500;
    const height = 320;
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
            * { box-sizing: border-box; }
            body { margin: 0; padding: 16px; background-color: #E0E5EC; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
            #wrapper { display: flex; align-items: center; justify-content: center; width: max-content; height: max-content; margin: auto; }
            ${css || ''}
          </style>
          <div id="wrapper">
            ${html || ''}
          </div>
        </div>
      </foreignObject>
    </svg>`;

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    return new Promise((resolve) => {
      const scale = 2;
      const timer = setTimeout(() => {
        URL.revokeObjectURL(url);
        resolve('');
      }, 500);

      img.onload = () => {
        clearTimeout(timer);
        try {
          const canvas = document.createElement('canvas');
          canvas.width = width * scale;
          canvas.height = height * scale;
          const ctx = canvas.getContext('2d');
          ctx.scale(scale, scale);
          ctx.fillStyle = '#E0E5EC';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/png', 0.92);
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
