//Insert Text Elements

var selRange = editor.getSelectedRange();

var p = Prompt.create();
p.title = "Text Element";
p.message = "What do you want to insert?";
p.addButton("break");
p.addButton("divider");
p.addButton("script divider");
p.addButton("more");
p.addButton("website");
p.addButton("current draft link");

var con = p.show();

if (con) {
  if (p.buttonPressed == "break") {
    var text = "<br>";
  }
  if (p.buttonPressed == "divider") {
    var text = "----";
  }
  if (p.buttonPressed == "script divider") {
    var text = "\/* --------------------- *\/";
  }
  if (p.buttonPressed == "more") {
    var text = "<!--more-->";
  }
  if (p.buttonPressed == "website") {
    var text = "https://nahumck.me/";
  }
  if (p.buttonPressed == "current draft link") {
    var text = draft.permalink;
  }
  editor.setSelectedText(text);
  editor.setSelectedRange(selRange[0]+text.length,0);
  editor.focus();
}
else {
  context.cancel();
}