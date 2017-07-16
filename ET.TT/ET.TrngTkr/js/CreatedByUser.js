SP.SOD.executeFunc("sp.js", "SP.ClientContext", sharePointReady);
ExecuteOrDelayUntilScriptLoaded(sharePointReady, "sp.js");
//strict mode stops these functions
function sharePointReady() {

    var clientContext = SP.ClientContext.get_current();
    var website = clientContext.get_web();

    clientContext.load(website);
    clientContext.executeQueryAsync(onRequestSucceeded, onRequestFailed);
}

function onRequestSucceeded() {
   
    // console.log(website.get_url());

}
function onRequestFailed(sender, args) {
    
    console.log("Error: " + args.get_message());
}
function GetCreatedByUserLoginName() {
    

    var context = new SP.ClientContext.get_current();
    var web = context.get_web();
    this.currentUser = web.get_currentUser();
    context.load(this.currentUser);
    context.executeQueryAsync(Function.createDelegate(this, this.onSuccessMethod),
    Function.createDelegate(this, this.onFailureMethod));

}

function onSuccessMethod(sender, args) {
   
    //var userName, userId, userEmail;

    var div = document.getElementById("Welcome");
    var divText = this.currentUser.get_title();
   
   // var userName = this.currentUser.get_loginName().slice(29, -4);
    var userName = this.currentUser.get_loginName().slice(2);
    
    //userId = this.currentUser.get_id();
    var userEmail = this.currentUser.get_email();
    var userNameTitle = this.currentUser.get_title();

    div.innerHTML = "<h2>Welcome,  " + divText + "</h2>";
    //populate user fields on new form

    TT.$("input[title='UserName']").val(userNameTitle);
    TT.$("input[title='UserEDIPI']").val(userName);
    //populate if blank
    if (TT.$("input[title='UserEmail']").val() === "") {
        TT.$("input[title='UserEmail']").val(userEmail);
    }
  
    if (TT.$("input[title='CreatedByName']").val() === "") {
        TT.$("input[title='CreatedByName']").val(userNameTitle);
        TT.$("input[title='CreatedByEDIPI']").val(userName);
    } else {

        TT.$("input[title='CreatedByName']", "input[title='CreatedByEDIPI']").attr("readonly", "true").css("border", "None");

    }
    TT.$("input[title='ModifiedByName']").val(divText);
    TT.$("input[title='ModifiedByEDIPI']").val(userName);
    //new training event form
    
    if (TT.$("input[title='TrainingManagerName']").val() === "")
    {
        TT.$("#ETPeoplePicker").val(userNameTitle);
        TT.$("input[title='TrainingManagerName']").val(userName);
       TT.$("input[title='TrainingManagerEmail']").val(userEmail);
    }
   
}

function onFailureMethod(sender, args) {
    console.log("request failed" + args.get_message() + "\n" + args.get_stackTrace());
}
//end get user functions
//people picker
//strict mode stops functions
//Render and initialize the client-side People Picker.
function initializePeoplePicker(peoplePickerElementId) {
    // Create a schema to store picker properties, and set the properties.
    var schema = {};
    schema["PrincipalAccountType"] = "User,DL";
    schema["SearchPrincipalSource"] = 15;
    schema["ResolvePrincipalSource"] = 15;
    schema["AllowMultipleValues"] = false;
    schema["MaximumEntitySuggestions"] = 250;
    schema["'Width"] = "280px";

    // Render and initialize the picker. 
    // Pass the ID of the DOM element that contains the picker, an array of initial
    // PickerEntity objects to set the picker value, and a schema that defines
    // picker properties.
    this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);

}

//Query the picker for user information.
function getUserInfo() {

    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.ETPeoplePicker_TopSpan;

    // Get information about all users.
    var users = peoplePicker.GetAllUserInfo();
    var userInfo = "";
    var keys = peoplePicker.GetAllUserKeys();

    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        var key = users[i].Key;
        var userName = users[i].DisplayText;
        //training history form
        TT.$("input[title='UserEDIPI']").val(key);
        TT.$("input[title='UserName']").val(userName);

        //Trainingeventform
        TT.$("input[title='TrainingManagerEDIPI']").val(key);
        TT.$("input[title='TrainingManagerName']").val(userName);
        ET.TT.GetUserEmail.load(key);

    }


}

ET.TT.GetUserEmail = function () {
    var _webUrl = _spPageContextInfo.webServerRelativeUrl;
    var load = function (selectedValue) {
        //trim first seven characters from key
        var accountName = selectedValue.substring(7);

        TT.$.ajax({
            cache: false,
            url: _webUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" + encodeURIComponent(accountName) + "'&$select=Email",

            type: 'GET',
            headers: {
                "Accept": "application/json;odata=verbose"
            },
            success: function (data) {
                console.log(JSON.stringify(data));
                var userEmail = data.d.Email;
                //training history form
                TT.$("input[title='UserEmail']").val(userEmail);
                //training event form
                TT.$("input[title='TrainingManagerEmail']").val(userEmail);
            }, //end of success
            error: function ajaxError(response) {
                console.log(response.status + "  " + response.statusText);
            }

        });

    };
    return {
        load: load
    };
}();

