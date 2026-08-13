const vscode = require('vscode');
const ClarifyAIPanelProvider = require('./ClarifyAIPanelProvider');

function activate(context) {
  const provider = new ClarifyAIPanelProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('clarifyai.agentView', provider)
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
