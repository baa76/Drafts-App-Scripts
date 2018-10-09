// Prompt example
// Using Select

var p = Prompt.create();
p.title = "2Do Project or Checklist Dump";
p.message = "Project or Checklist?.";

var options = ["Project", "Checklist"];
var selectedOptions = ["Project"];

// task type selection
p.addSelect("s1", "Select one...", options, selectedOptions, false);

// tag type selections
p.addSelect("s2", "Select multiple...", options, selectedOptions, true);

p.addButton("OK");

if (p.show()) {
	var s = "Selected: " + p.fieldValues["s1"] + "\n\n";
	s += "Multi-Select: " + p.fieldValues["s2"] + "\n";
	alert(s);
}

//2do
const baseURL = "twodo://x-callback-url/add";
var tags = "Added via Drafts App";

var tasks = draft.content.split("\n");
for (var task of tasks) {
	// create and configure callback object
	var cb = CallbackURL.create();
	cb.baseURL = baseURL;
	cb.addParameter("task", task);
	cb.addParameter("tags", tags);
	// open and wait for result
	var success = cb.open();
	if (success) {
		console.log("Task created");
	}
	else { // something went wrong or was cancelled
	  	console.log(cb.status);
	  	if (cb.status == "cancel") {
			context.cancel();
		}
		else {
			context.fail();
		}
	}
};