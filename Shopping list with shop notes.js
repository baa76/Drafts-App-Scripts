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
let options = ["Batch", "Single"];
let selectedOptions = ["Batch"];
let p = Prompt.create();
p.title = "Stores";
p.message = "Choose a Store";
p.addSelect("s1", "Process single line or all lines?", options, selectedOptions, false);
for (i = 0; i < lists.length; i++) {
  p.addButton(lists[i], '| ' + lists[i]);
}
let con = p.show();

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
if(con){
  var textToAdd = null;
  var addSpace = true;
  const lines = editor.getText().split('\n');
  const appendToStrings = function(line) {
    line = line.concat(b.buttonPressed);
    return line;
};
}