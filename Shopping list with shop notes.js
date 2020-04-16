// Prompt
/* --------------------- */
var lists = [
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

let p = Prompt.create();
p.title = "Stores";
p.message = "Choose a Store";
for (i = 0; i < lists.length; i++) {
  p.addButton(lists[i], '#'+ lists[i] + '\n');
}

let options = ["Batch", "Single"];
let selectedOptions = ["Batch"];

// task type selection
p.addSelect("s1", "Process single line or all lines?", options, selectedOptions, false);

var con = p.show();

if (con) {
  var textToInsert = `| {p.buttonPressed}`;
  var sel = editor.getSelectedText();
  var selRange = editor.getSelectedRange();

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