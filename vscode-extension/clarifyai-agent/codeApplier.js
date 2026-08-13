const vscode = require('vscode');

async function applyCodeToFile(codeSnippet) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active text editor found to apply code.');
    return false;
  }

  const document = editor.document;
  const fullRange = new vscode.Range(
    document.positionAt(0),
    document.positionAt(document.getText().length)
  );

  const success = await editor.edit(editBuilder => {
    editBuilder.replace(fullRange, codeSnippet);
  });

  if (success) {
    vscode.window.showInformationMessage(`Code successfully applied to ${document.fileName}`);
  }
  return success;
}

async function insertCodeAtCursor(codeSnippet) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active text editor found to insert code.');
    return false;
  }

  const position = editor.selection.active;
  const success = await editor.edit(editBuilder => {
    editBuilder.insert(position, codeSnippet);
  });

  if (success) {
    vscode.window.showInformationMessage('Code inserted at cursor position.');
  }
  return success;
}

async function openNativeDiffView(proposedContent) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active editor open for diff preview.');
    return;
  }

  const document = editor.document;
  const originalUri = document.uri;
  const proposedDoc = await vscode.workspace.openTextDocument({
    content: proposedContent,
    language: document.languageId
  });

  await vscode.commands.executeCommand(
    'vscode.diff',
    originalUri,
    proposedDoc.uri,
    `AI Diff: ${document.fileName}`
  );
}

module.exports = {
  applyCodeToFile,
  insertCodeAtCursor,
  openNativeDiffView
};
