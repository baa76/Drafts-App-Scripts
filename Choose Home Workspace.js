// select from a list of workspace and load

let f = () => {
	let workspaces = Workspace.getAll();
	if (workspaces.length == 0) {
		alert("No workspaces defined.");
		return false;
	}
	
	let p = Prompt.create();
	p.title = "Select Workspace";
	p.message = "Choose workspace to apply";
	
	let ix = 0;
	for (let ws of workspaces) {
		p.addButton(ws.name, ix);
		ix++;
	}
	
	if (!p.show()) {
		return false;
	}
	
	let selectedIndex = p.buttonPressed;
	let ws = workspaces[selectedIndex];
	app.applyWorkspace(ws);
	app.showDraftList();
}

if (!f()) {
	context.cancel();
}