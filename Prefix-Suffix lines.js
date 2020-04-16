// Add prefix or suffix to the selected lines (or all lines).

// Define the text that's going to be edited.
var [oldStart, oldLen] = editor.getSelectedRange();
if (oldLen == 0) { // use full draft
	var [start, len] = [0, editor.getText().length];
}
else {
	var [start, len] = editor.getSelectedLineRange();
}
var lineText = editor.getTextInRange(start, len);
if (lineText.endsWith("\n")) { // trailing LF doesn't count
	lineText = lineText.slice(0, -1);
	len -= 1;
}

// Prepare the prompt and get the text from the user.
var p = Prompt.create();
p.title = "Prefix/Suffix Lines";
p.addTextField("prefix", "Prefix:", "", {placeholder: "Prefix text", wantsFocus: true});
p.addTextField("suffix", "Suffix:", "", {placeholder: "Suffix text", wantsFocus: true});
p.addButton("Add");
p.addButton("Remove");

var didSelect = p.show();

if (didSelect) { // make the changes
	// Get the affixes
	let prefix = p.fieldValues["prefix"];
	let suffix = p.fieldValues["suffix"];
	
	// Edit the selected lines.
	let lines = lineText.split('\n');
	
	if (p.buttonPressed == "Add") {
		lines.forEach((line, i) => lines[i] = prefix + line + suffix);
	}
	else { // remove
		if (prefix != "") {
			let preLen = prefix.length;
			lines.forEach(function(line, i) {
				if (line.slice(0, preLen) == prefix) {
					lines[i] = line.slice(preLen);
				}
			});
		}
		if (suffix != "") {
			let sufLen = suffix.length;
			lines.forEach(function(line, i) {
				if (line.slice(-sufLen) == suffix) {
					lines[i] = line.slice(0, -sufLen);
				}
			});
		}
	}
	
	// Replace the text in the editor and select it.
	let replacement = lines.join('\n')
	editor.setTextInRange(start, len, replacement);
	editor.setSelectedRange(start, replacement.length);
	editor.activate();
}
else { // put selection back
	editor.setSelectedRange(oldStart, oldLen);
	editor.activate();
}