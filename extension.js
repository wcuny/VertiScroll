// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vertiscroll" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vertiscroll.helloWorld', function () {

		// var allTabs = vscode.window.visibleTextEditors;
		// var leftTab = allTabs[0];
		// var rightTab = allTabs[1];
		// var leftTabBottomLine = leftTab.visibleRanges[0].end.line;
		// var rightTabBottomLine = rightTab.visibleRanges[0].end.line;

		// if(vscode.window.activeTextEditor == leftTab){
		// 	vscode.commands.executeCommand('workbench.action.nextEditor');
		// 	vscode.commands.executeCommand('revealLine', {lineNumber: leftTabBottomLine, at: 'top'});
		// 	vscode.commands.executeCommand('workbench.action.previousEditor');
		// }
		// else if(vscode.window.activeTextEditor == rightTab){
		// 	vscode.commands.executeCommand('workbench.action.previousEditor');
		// 	vscode.commands.executeCommand('revealLine', {lineNumber: rightTabBottomLine, at: 'top'});
		// 	vscode.commands.executeCommand('workbench.action.nextEditor');
		// }

		//put the above commented code into a scroll listener and run it every time the user scrolls
		var allTabs = vscode.window.visibleTextEditors;
		var leftTab = allTabs[0];
		var rightTab = allTabs[1];

		function calculate(){
			var leftTabBottomLine = leftTab.visibleRanges[0].end.line;
			var rightTabBottomLine = rightTab.visibleRanges[0].end.line;
			if(vscode.window.activeTextEditor == leftTab){
				vscode.commands.executeCommand('workbench.action.nextEditor');
				vscode.commands.executeCommand('revealLine', {lineNumber: leftTabBottomLine, at: 'top'});
				vscode.commands.executeCommand('workbench.action.previousEditor');
			}
			else if(vscode.window.activeTextEditor == rightTab){
				vscode.commands.executeCommand('workbench.action.previousEditor');
				vscode.commands.executeCommand('revealLine', {lineNumber: rightTabBottomLine, at: 'top'});
				vscode.commands.executeCommand('workbench.action.nextEditor');
			}
		}
		//add a scroll listener
		vscode.window.onDidChangeTextEditorVisibleRanges(function(){
			calculate();
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivat5ed
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
