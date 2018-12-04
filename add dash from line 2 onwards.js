// Select line 2 onwards
let titleText = draft.processTemplate("[[title]]");
let subtaskText = draft.processTemplate("[[line|2..]]");
// character string used for indent
let indent = "- ";

// loop over lines and add indents skipping blank lines
let indentedLines = [];
let indentCt = 0;
let lines = subtaskText.split("\n");

for(let line of lines) {
	if (line.length > 0) {
		indentedLines.push(indent + line);
		indentCt++;
	}
	else {
		indentedLines.push(line);
	}
}

// set text
let resultSubtaskText = indentedLines.join("\n");
let resultText = (titleText + "\n" + resultSubtaskText);
editor.setText(resultText);