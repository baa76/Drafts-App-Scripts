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
  var textToInsert = "insert this at the start: ";

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