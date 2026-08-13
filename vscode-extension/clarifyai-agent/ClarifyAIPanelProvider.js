const { getChatRendererHtml } = require('./webview/chatRenderer');
const { handleWebviewMessage } = require('./chatBridge');

class ClarifyAIPanelProvider {
  constructor(extensionUri) {
    this._extensionUri = extensionUri;
  }

  resolveWebviewView(webviewView) {
    webviewView.webview.options = {
      enableScripts: true
    };
    webviewView.webview.html = getChatRendererHtml();
    webviewView.webview.onDidReceiveMessage(message => {
      handleWebviewMessage(message, webviewView);
    });
  }
}

module.exports = ClarifyAIPanelProvider;
