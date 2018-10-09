// Prompt example
// Using Select 

var p = Prompt.create();
p.title = "Prompt Example";
p.message = "Demonstrates options for text view and switches in prompts.";

p.addTextView("tv1", "Notes", "", {
	"height": 150.0
});

p.addSwitch("sw1", "Option 1", false);
p.addSwitch("sw2", "Option 2", false);

p.addButton("OK");

if (p.show()) {
	var s = "Text: " + p.fieldValues["tv1"] + "\n\n";
	s += "Option 1: " + p.fieldValues["sw1"] + "\n";
	s += "Option 2: " + p.fieldValues["sw2"] + "\n";
	alert(s);
}