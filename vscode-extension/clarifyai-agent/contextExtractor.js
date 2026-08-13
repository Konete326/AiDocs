const vscode = require('vscode');
const path = require('path');

function getActiveEditorContext() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return {
      filename: 'No active editor',
      languageId: 'plaintext',
      selection: '',
      fullContent: ''
    };
  }

  const document = editor.document;
  const selection = editor.selection;
  const selectedText = document.getText(selection);
  const fullText = document.getText();
  const filename = path.basename(document.fileName);

  return {
    filename,
    languageId: document.languageId,
    selection: selectedText,
    fullContent: fullText
  };
}

module.exports = {
  getActiveEditorContext
};
