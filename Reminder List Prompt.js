// Prompt
/* --------------------- */
var lists = ["", "", "",…];

var p = Prompt.create();
p.title = "";
p.message = "";
for (i = 0; i < lists.length; i++) {
  p.addButton(lists[i]);
  p.addTextField("fieldName", "Label", "");
}
var con = p.show();

if (con) {
  // action goes here
}
else {
  context.cancel();
}