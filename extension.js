
const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "easy-translator" is now active!');

	let disposable = vscode.commands.registerCommand('easy-translator.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;
		const selectedText = editor.selection
		const text = editor.document.getText(selectedText)


		// const data = JSON.stringify([
		// 	{
		// 		"Text": text,
		// 	}
		// ]);
		// var XMLHttpRequest = require('xhr2');
		// const xhr = new XMLHttpRequest();
		// xhr.withCredentials = true;

		// xhr.addEventListener("readystatechange", function () {
		// 	if (this.readyState === this.DONE) {
		// 		console.log(this.responseText);
		// 		vscode.window.showInformationMessage(this.responseText);
		// 		editor.edit(builder => builder.replace(selectedText, this.responseText))
		// 	}
		// });

		// xhr.open("POST", "https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=de&api-version=3.0&profanityAction=NoAction&textType=plain");
		// xhr.setRequestHeader("content-type", "application/json");
		// xhr.setRequestHeader("X-RapidAPI-Key", "YOUR-RAPIDAPI-KEY");
		// xhr.setRequestHeader("X-RapidAPI-Host", "microsoft-translator-text.p.rapidapi.com");

		// xhr.send(data);



		const data = JSON.stringify([
			{
				"Text": text,
			}
		]);

		var XMLHttpRequest = require('xhr2');
		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener('readystatechange', function () {
			if (this.readyState === this.DONE) {
				console.log(this.responseText);
				vscode.window.showInformationMessage(this.responseText);
				editor.edit(builder => builder.replace(selectedText, this.responseText))

			}
		});

		xhr.open('POST', 'https://microsoft-translator-text.p.rapidapi.com/BreakSentence?api-version=3.0');
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.setRequestHeader('X-RapidAPI-Key', '8135140744msh73f3b68a2623af8p1bdf6ejsn9f44f803b4e9');
		xhr.setRequestHeader('X-RapidAPI-Host', 'microsoft-translator-text.p.rapidapi.com');

		xhr.send(data);





		// Display a message box to the user
		// vscode.window.showInformationMessage('Hi guys, subscribe!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}