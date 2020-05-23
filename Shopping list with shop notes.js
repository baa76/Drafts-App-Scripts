// Prompt
/* --------------------- */
let shops = [
    "Any Supermarket",
    "Aldi",
    "Coles",
    "Woolworths",
    "Tip Top Butcher",
    "Farmer Joe's",
    "Bulk Wholefoods",
    "Kmart",
    "Preston Market",
    "Officeworks",
    "Bunnings",
    "Search for best deal online",
    "eBay",
    "Amazon"
    ];

//Build Prompt
let p1 = Prompt.create();
p1.title = "Stores";
p1.message = "Choose a Store";
for (i = 0; i < shops.length; i++) {
  p1.addButton(shops[i], '| ' + shops[i]);
}
let p1s = p.show();
//Process Prompt
if(p1s) {
  const lines = editor.getText().split('\n');
  const appendToStrings = function(line) {
    line = line.concat(p.buttonPressed);
    return line;
  };
  const newLines = lines.map(appendToStrings);
  const afterText = newLines.join("\n");
  editor.setText(afterText);
}
else {
  context.cancel();
}
var lists = [
  "Shopping",
  "Non Grocery Purchases"
];

var p2 = Prompt.create();
p2.title = "Lists";
p2.message = "Choose a List";
for (i = 0; i < lists.length; i++) {
p2.addButton(lists[i], '#'+ lists[i] + '\n');
}
var con = p.show();

if (con) {
var textToInsert = p.buttonPressed;
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