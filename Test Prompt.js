// Prompt template

let p = Prompt.create();
p.title = "title";
p.message = "message";
p.addTextField("field", "Label", "");
p.addTextView("text", "Label", "", {"height":60,"keyboard":"default"});
p.addSwitch("sw", "Label", false);
p.addDatePicker("dt", "Label", new Date(), {"mode":"dateAndTime"});
p.addPicker('pick', 'Label', [['pick1', 'pick2']], [0]);
p.addSelect('select', 'Label', ['sel1', 'sel2'], ['sel2'], false);

let buttons = ["btn1", "btn2"];
for (var button of buttons) {
  p.addButton(button);
}

if (p.show()) {
  var field = p.fieldValues['field'];
  var text = p.fieldValues['text'];
  var sw = p.fieldValues['sw'];
  var dt = p.fieldValues['dt'];
  var listIndex = p.fieldValues['pick']; // integer
  var selected = p.fieldValues['select'];

  switch (p.buttonPressed) {
    case 'btn1':

      break;
    case 'btn2':

      break;
    default:
      app.displayErrorMessage("switch/case not implemented!");
      break;
  }
} else {
  context.cancel();
}