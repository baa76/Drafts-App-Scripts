// Prompt
/* --------------------- */
var lists = [
    "Shopping",
    "Other Shopping",
    "Maintenance",
    "Errands",
    "Family",
    "Holiday Activies",
    "Gift Ideas for Kids",
    "Camping Pack List",
    "Christmas Pack List",
    "Short Trip Pack List"];

var p = Prompt.create();
p.title = "Lists";
p.message = "Choose a List";
for (i = 0; i < lists.length; i++) {
  p.addButton(lists[i]);
  //p.addTextField("fieldName", "Label", "");
}
var con = p.show();

if (con) {
  // action goes here
}
else {
  context.cancel();
}