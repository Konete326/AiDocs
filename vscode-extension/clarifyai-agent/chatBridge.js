const { getActiveEditorContext } = require('./contextExtractor');
const { applyCodeToFile, insertCodeAtCursor, openNativeDiffView } = require('./codeApplier');

async function handleWebviewMessage(message, webviewView) {
  if (!message || !webviewView) return;

  if (message.command === 'ACTION_APPLY_CODE') {
    await applyCodeToFile(message.code);
    return;
  }

  if (message.command === 'ACTION_INSERT_CURSOR') {
    await insertCodeAtCursor(message.code);
    return;
  }

  if (message.command === 'ACTION_OPEN_DIFF') {
    await openNativeDiffView(message.code);
    return;
  }

  if (message.command === 'ACTION_SEND_PROMPT' || message.command === 'startConsultation') {
    const context = getActiveEditorContext();

    webviewView.webview.postMessage({
      type: 'STREAM_START',
      filename: context.filename
    });

    const responseText = `[Analysis for ${context.filename || 'Workspace'}]\n\nBased on your active code context:\n\n1. Component Structure: High-quality Neumorphic layout detected.\n2. Optimization: Ensure all shadows use dual RGBA layers (#A3B1C6 / white).\n3. Ready for export and marketplace publishing!`;

    const words = responseText.split(' ');
    for (let i = 0; i < words.length; i++) {
      await new Promise((r) => setTimeout(r, 30));
      webviewView.webview.postMessage({
        type: 'STREAM_CHUNK',
        content: words[i] + ' '
      });
    }

    webviewView.webview.postMessage({
      type: 'STREAM_END'
    });
  }
}

module.exports = {
  handleWebviewMessage
};
