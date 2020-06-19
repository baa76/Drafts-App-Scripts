const authKey = "pk_2719152_WYIHLOGKZFS608YDKSZ53Z7189V8R320"; //Herrods IML Auth key for user bryn.roberts
const contentType = "application/json"; //content-type
const baseURL = "https://api.clickup.com/api/v2/"; //base URL
const teamID = "6904442";
const http = HTTP.create(); // create HTTP object
// Get getSpaces
const getSpaces = http.request({
  "url": baseURL,
  "method": "GET",
  "headers": {
            "Authorization": authKey + "team/" + teamID + "/space",
            "Content-Type": contentType
  }
});

if (response.success) {
  let text = response.responseText;
}
else {
  console.log(response.statusCode);
  console.log(response.error);
}

let obj = JSON.parse(text);

let p1 = Prompt.create();
p1.title = "Spaces";
p1.message = "Choose a Space";
for (i = 0; i <obj.length; i++) {
  p1.addButton(whatWeWant[i].name,whatWeWant[i].id);
}
let p1s = p1.show();

it = p1.buttonPressed;

















if(p1s) {
    const lines = editor.getText().split('\n');
    const appendToStrings = function(line) {
      line = line.concat(p1.buttonPressed);
      return line;
    };
    const newLines = lines.map(appendToStrings);
    const afterText = newLines.join("\n");
    editor.setText(afterText);
  }
  else {
    context.cancel();
  }


let d = draft.create;
d.content = it;
d.update();


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
let p1s = p1.show();
//Process Prompt
if(p1s) {
  const lines = editor.getText().split('\n');
  const appendToStrings = function(line) {
    line = line.concat(p1.buttonPressed);
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
var con = p2.show();

if (con) {
var textToInsert = p2.buttonPressed;
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