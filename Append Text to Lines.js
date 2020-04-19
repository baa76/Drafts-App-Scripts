// See online documentation for examples
// https://docs.getdrafts.com/docs/actions/scripting
var textToAdd = null;
var addSpace = true;
const lines = editor.getText().split('\n');

const appendToStrings = function(line) {
  if (addSpace) {
    line = line.concat(" ");
  }
  line = line.concat(textToAdd);

  return line;
}

var p = Prompt.create();
p.title = "Append Text";
p.addTextView("tv1", "Type the text you want to append.", "", {
	"height": 30
});
p.addSwitch("sw1", "Add Space", addSpace);
p.addButton("OK");

if (p.show()) {
  textToAdd = p.fieldValues["tv1"];
  addSpace = p.fieldValues["sw1"];
}

if (textToAdd !== null) {
  const newLines = lines.map(appendToStrings);

  const afterText = newLines.join("\n");

  editor.setText(afterText);
}