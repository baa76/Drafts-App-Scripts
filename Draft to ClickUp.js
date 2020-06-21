var http = HTTP.create(); // create HTTP object
var baseURL = "https://api.clickup.com/api/v2/"; //base URL
var contentType = "application/json"; //content-type
var authKey = "pk_2719152_WYIHLOGKZFS608YDKSZ53Z7189V8R320"; //Herrods IML Auth key for user bryn.roberts
var teamID = "6904442";

function getData() {
    var response = http.request({
        url: url,
        method: "GET",
        headers: {
            Authorization: authKey,
        }
    });
    if (response.success) {
        var text = response.responseText;
        var data = JSON.parse(text);
        return data;
    } else {
        console.log(response.statusCode);
        console.log(response.error);
        alert(response.error);
    }
}

function buildPrompt(title, message, array) {
    var p = Prompt.create();
    p.title = title;
    p.message = message;
    obj = data[array];
    for (i = 0; i < obj.length; i++) {
      p.addButton(obj[i].name, obj[i].id);
    }
    p.show();
    var selData = p.buttonPressed;
    return selData;
}

//Get Spaces
var url = baseURL + "team/" + teamID + "/space?archived=false";
var data = getData();
//Build Prompt and Get ID
var spaceID = buildPrompt("Spaces","Select a Space","spaces");

//Get Folders
var url = baseURL + "space/" + spaceID + "/folder?archived=false";
var data = getData();
//Build Prompt and Get ID
var folderID = buildPrompt("Folders","Select a Folder","folders");

// Get Lists
var url = baseURL + "folder/" + folderID + "/list?archived=false";
var data = getData();
//Build Prompt and Get ID
var ListID = buildPrompt("Lists","Select a List","lists");
