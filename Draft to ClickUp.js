var http = HTTP.create(); // create HTTP object
var authKey = "pk_2719152_WYIHLOGKZFS608YDKSZ53Z7189V8R320"; //Herrods IML Auth key for user bryn.roberts
var contentType = "application/json"; //content-type
var baseURL = "https://api.clickup.com/api/v2/"; //base URL
var teamID = "6904442";
var url = baseURL + "team/" + teamID + "/space" + "?archived=false";

var response = http.request({
  "url": url,
  "method": "GET",
  "headers": {
    "Authorization": authKey
  }
});

if (response.success) {
  var text = response.responseText;
  var data = response.responseData;
}
else {
  console.log(response.statusCode);
  console.log(response.error);
}
var data = JSON.parse(text);
var text = JSON.stringify(data);

//Build Prompt
var p = Prompt.create();
p.title = "Spaces";
p.message = "Choose a Space";
for (i = 0; i < data.spaces.length; i++) {
  p.addButton(data.spaces[i].name, data.spaces[i].id);
}
var ps = p.show();

var selSpace = p.buttonPressed;
alert(selSpace);

var url = baseURL + "space/" + selSpace + "/folder?archived=false";

var response = http.request({
  "url": url,
  "method": "GET",
  "headers": {
    "Authorization": authKey
  }
});

if (response.success) {
  var text = response.responseText;
  var data = response.responseData;
}
else {
  console.log(response.statusCode);
  console.log(response.error);
}
var data = JSON.parse(text);
var text = JSON.stringify(data);

//Build Prompt
var p = Prompt.create();
p.title = "Folders";
p.message = "Choose a Folder";
for (i = 0; i < data.folders.length; i++) {
  p.addButton(data.folders[i].name, data.folders[i].id);
}
var ps = p.show();

var selFolder = p.buttonPressed;
alert(selFolder);


// draft.content = textToInsert + draft.content;
// draft.update();






/* var getSpaces = http.request({
  "url": baseURL + "team/" + teamID + "/space",
  "method": "GET",
  "headers": {
            "Authorization": authKey,
            "Content-Type": "application/json"
  }
});

let response = HTTPResponse;

if (response.success) {
  var text = response.responseText;
}
else {
  console.log(response.statusCode);
  console.log(response.error);
}
 */
// let obj = JSON.parse(text);

// let p1 = Prompt.create();
// p1.title = "Spaces";
// p1.message = "Choose a Space";
// for (i = 0; i <obj.length; i++) {
//   p1.addButton(obj[i].name,obj[i].id);
// }
// let p1s = p1.show();

// it = p1.buttonPressed;

// alert(it);
















/* if(p1s) {
    var lines = editor.getText().split('\n');
    var appendToStrings = function(line) {
      line = line.concat(p1.buttonPressed);
      return line;
    };
    var newLines = lines.map(appendToStrings);
    var afterText = newLines.join("\n");
    editor.setText(afterText);
  }
  else {
    context.cancel();
  }


let d = draft.create;
d.content = it;
d.update();


// Prompt
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
} */