const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "vertiscroll" is now active!');

    let disposable = vscode.commands.registerCommand('vertiscroll.enable', function () {
        var allTabs = vscode.window.visibleTextEditors;
        var leftTab = allTabs[0];
        var rightTab = allTabs[1];
        function calculate() {
            var activeTab = vscode.window.activeTextEditor;
            var activeTabBottomLine = activeTab.visibleRanges[0].end.line;

            if (activeTab === leftTab) {
                var rightTabTopLine = activeTabBottomLine + 1;
                rightTab.revealRange(
                    new vscode.Range(rightTabTopLine, 0, rightTabTopLine, 0),
                    vscode.TextEditorRevealType.AtTop
                );
            } else if (activeTab === rightTab) {
                var leftTabTopLine = activeTabBottomLine + 1;
                leftTab.revealRange(
                    new vscode.Range(leftTabTopLine, 0, leftTabTopLine, 0),
                    vscode.TextEditorRevealType.AtTop
                );
            }
        }
		setInterval(calculate, 1000 / 120);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
