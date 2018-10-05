// See online documentation for examples
// http://getdrafts.com/scripting
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
}