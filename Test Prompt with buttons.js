// Prompt example
// Using Select

let p = Prompt.create();
p.title = "2Do listDump";
// p.message = "Project or Checklist?";

let options = ["Project", "Checklist"];
let selectedOptions = ["Project"];

// task type selection
p.addSelect("s1", "Project or Checklist?", options, selectedOptions, false);

// tag type selections
// p.addSelect("s2", "Select multiple...", options, selectedOptions, true);

p.addButton("OK");

if (p.show()) {
	let s = "Selected: " + p.fieldValues["s1"] + "\n\n";
	// s += "Multi-Select: " + p.fieldValues["s2"] + "\n";
	alert(s);
}

//2do
/* const baseURL = "twodo://x-callback-url/add";
let tags = "Added via Drafts App";

let tasks = draft.content.split("\n");
for (let task of tasks) {
	// create and configure callback object
	let cb = CallbackURL.create();
	cb.baseURL = baseURL;
	cb.addParameter("task", task);
	cb.addParameter("tags", tags);
	// open and wait for result
	let success = cb.open();
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
}; */