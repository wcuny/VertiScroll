const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('vertiscroll.enable', function () {
        var allTabs = vscode.window.visibleTextEditors;
        var tab0 = allTabs[0];
        var tab1 = allTabs[1];
        function calculate2tabs() {
            var activeTab = vscode.window.activeTextEditor;
            var activeTabBottomLine = activeTab.visibleRanges[0].end.line;

            if (activeTab === tab0) {
                var tab1TopLine = activeTabBottomLine;
                tab1.revealRange(
                    new vscode.Range(tab1TopLine, 0, tab1TopLine, 0),
                    vscode.TextEditorRevealType.AtTop
                );
            } else if (activeTab === tab1) {
                var tab0TopLine = activeTabBottomLine;
                tab0.revealRange(
                    new vscode.Range(tab0TopLine, 0, tab0TopLine, 0),
                    vscode.TextEditorRevealType.AtTop
                );
            }
        }

        if(allTabs.length >= 2){
		    setInterval(calculate2tabs, 1000 / 120);
        }
        else {
            vscode.window.showErrorMessage('You need to have exactly two tabs open to use this extension.');
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
