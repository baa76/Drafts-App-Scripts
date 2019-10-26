// Prompt
/* --------------------- */
var lists = [
    "Shopping",
    "Finance",
    "To Do",
    "Errands",
    "Family",
    "Roy",
    "Mack",
    "Car",
    "Maintenance",
    "Health",
    "Study",
    "Shortcut Ideas",
    "Camping Trip Food"];

var p = Prompt.create();
p.title = "Lists";
p.message = "Choose a List";
for (i = 0; i < lists.length; i++) {
  p.addButton(lists[i], '#'+ lists[i] + '\n');
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