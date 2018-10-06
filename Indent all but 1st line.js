// Action: Change this script to indent all but the first line; this will then be used as a first step in a drafts action paste dump to a new 2do project or checklist

/* const allText
let [selStart, selLen] = editor.getSelectedRange();
let [lnStart, lnLen] = editor.getSelectedLineRange();
let lnText = editor.getTextInRange(lnStart, lnLen); */

// Select line 2 onwards
let titleText = draft.processTemplate("[[title]]");
let subtaskText = draft.processTemplate("[[line|2..]]");
// character string used for indent
let indent = "    ";

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
// editor.setTextInRange(lnStart, lnLen, resultText);

// update selection
/* let newStart = selStart + indent.length;
let newLen = selLen + (indent.length * (indentCt - 1))
editor.setSelectedRange(newStart, newLen); */