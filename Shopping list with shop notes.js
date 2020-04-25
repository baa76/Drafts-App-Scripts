// Prompt
/* --------------------- */
let lists = [
    "Any Supermarket",
    "Aldi",
    "Coles",
    "Woolworths",
    "Tip Top Butcher",
    "Farmer Joe's",
    "Preston Market",
    "Officeworks",
    "Bunnings",
    "Search for best deal online",
    "eBay",
    "Amazon"
    ];

//Build Prompt
let p = Prompt.create();
p.title = "Stores";
p.message = "Choose a Store";
for (i = 0; i < lists.length; i++) {
  p.addButton(lists[i], '| ' + lists[i]);
}
let pmpt = p.show();
const lines = editor.getText().split('\n');

const appendToStrings = function(line) {
  // if (addSpace) {
  //   line = line.concat(" ");
  // }
  line = line.concat(p.buttonPressed);
  return line;
};

// if (pmpt) {
//   textToAdd = p.fieldValues["tv1"];
// // addSpace = p.fieldValues["sw1"];
// }
// if (textToAdd !== null) {
  const newLines = lines.map(appendToStrings);
  const afterText = newLines.join("\n");
  editor.setText(afterText);
// }

// let options = ["Batch", "Single"];
// let selectedOptions = ["Batch"];
// p.addSelect("s1", "Process single line or all lines?", options, selectedOptions, false);
// let textToAdd = null;
// let addSpace = true;
// let p = Prompt.create();
// p.title = "Append Text";
// p.addTextView("tv1", "Type the text you want to append.", "", {
//   "height": 30
// });
// p.addSwitch("sw1", "Add Space", addSpace);
// p.addButton("OK");
/* if (con) {
  let textToInsert = p.buttonPressed;
  let sel = editor.getSelectedText();
  let selRange = editor.getSelectedRange();

  draft.content = textToInsert + draft.content;
  draft.update();

  editor.activate();

  if (!sel || sel.length == 0) {
    editor.setSelectedRange(selRange[0]+textToInsert.length,0);
  }
  else {
    editor.setSelectedRange(selRange[0]+textToInsert.length, selRange[1],0);
  }
}
else {
  context.cancel();
}
 */
/* if(con){
  let textToAdd = null;
  let addSpace = true;
  const lines = editor.getText().split('\n');
  const appendToStrings = function(line) {
    line = line.concat(b.buttonPressed);
    return line;
}; */
