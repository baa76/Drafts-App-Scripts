// Action: Change this script to indent all but the first line; this will then be used as a first step in a drafts action paste dump to a new 2do project or checklist
const allText = draft.content();

let [selStart, selLen] = editor.getSelectedRange();
let [lnStart, lnLen] = editor.getSelectedLineRange();
let lnText = editor.getTextInRange(lnStart, lnLen);

console.log(lnText);

// character string used for indent
// let indent = "    ";

// grab ranges and text

// loop over lines and add indents skipping blank lines
/* let indentedLines = [];
let indentCt = 0;
let fl = false;
if (lnText.endsWith("\n")) {
	lnText = lnText.slice(0, -1);
	fl = true;
}
let lines = lnText.split("\n");
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
let resultText = indentedLines.join("\n");
if (fl) { resultText = resultText + "\n"; }
editor.setTextInRange(lnStart, lnLen, resultText);

// update selection
let newStart = selStart + indent.length;
let newLen = selLen + (indent.length * (indentCt - 1))
editor.setSelectedRange(newStart, newLen); */
