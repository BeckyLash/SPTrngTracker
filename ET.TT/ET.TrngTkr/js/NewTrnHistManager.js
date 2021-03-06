var ET = ET || {};
ET.TT = ET.TT || {};
 
TT.$ = jQuery.noConflict();

TT.$(document).ready(function () {
    "use strict";

    var today = ET.TT.getToday.currentDate();
    today = today.slice(0, 11);//field not accepting seconds; problem does not appear on new and edit training history for employees

    var isactive = TT.$("input[title=IsActive]").val();
    ET.TT.PopulateFirstLevel.load();
    ET.TT.TrainingEventChoices.load();
    GetCreatedByUserLoginName();
    
    initializePeoplePicker("ETPeoplePicker");
    ET.TT.BindButtons(); //must come after peoplepicker
    
    TT.$("input[title='CreatedDate']").val(today);
    TT.$("input[title='ModifiedDate']").val(today);
    TT.$("input[title='DateCompleted']").val(today);
    TT.$("#DateCompletedContainer").val(today);
    TT.$("input[title=IsActive]").val("Yes");
    ET.TT.ButtonToolbarManagerForms.load();

});

function PreSaveAction() {
    "use strict";
    //get error divs
    var errorOrganization = document.getElementById("ErrorOrg");
    var errorCourseTitle = document.getElementById("ErrorCoursesContainer");
    var errorAttendeeName = document.getElementById("ErrorCurrentEmployeeContainer");
    var errorDateCompleted = document.getElementById("DateCompletedContainer");
    var errorIsActive = document.getElementById("ErrorisActiveContainer");
    //get fields to validate - don't need Org fields
    var courseTitle = document.getElementById("CoursesContainer");
    var attendeeName = document.getElementById("CurrentEmployeeContainer");
    var dateCompleted = document.getElementById("DateCompletedContainer");
    var isActive = document.getElementById("isActiveContainer");
    //unique to this form
    ET.TT.SaveTrainingHistoryManagerForm();
    //clear existing error messages
    errorOrganization.innerHTML = "";
    errorCourseTitle.innerHTML = "";
    errorAttendeeName.innerHTML = "";
    errorDateCompleted.innerHTML = "";
    errorIsActive.innerHTML = "";
    //clear existing formatting
    TT.$(courseTitle, attendeeName, dateCompleted, isActive).attr("class", "errorInputClear");
   var fieldsText = ["DateCompletedContainer"];
    var y, fieldsLengthText = fieldsText.length;
    var fieldnameText;
    for (y = 0; y < fieldsLengthText; y++) {
        fieldnameText = fieldsText[y];
        if (document.getElementById(fieldnameText).value === "") {
            var fieldLabelText = TT.$("#" + fieldnameText).attr("class", "errorInputActive");
            var errorMessageText = document.getElementById("Error" + fieldnameText);
            errorMessageText.innerHTML = "You must enter information in the required box.";
            //return false;
        }
    }
    //validate peoplepicker
    if (attendeeName.innerHTML === "") {
        var fieldLabelText = TT.$("#ETPeoplePicker_TopSpan").attr("class", "errorInputActive");

        var errorMessageText = document.getElementById("ErrorCurrentEmployeeContainer");
        errorMessageText.innerHTML = "You must select an employee name.";

        //return false;
    }
    //validate dropdown lists
    var fieldsDropdownLists = ["CoursesContainer", "isActiveContainer"];
    var x, fieldsLengthDropdown = fieldsDropdownLists.length;
    var fieldnameDropdown;
    for (x = 0; x < fieldsLengthDropdown; x++) {
        fieldnameDropdown = fieldsDropdownLists[x];

        if (document.getElementById(fieldnameDropdown).value === "0" || document.getElementById(fieldnameDropdown).value === "SelectCourse") {

            var fieldLabelDropdown = TT.$("#" + fieldnameDropdown).attr("class", "errorInputActive");
            var errorMessageDropdown = document.getElementById("Error" + fieldnameDropdown);
            errorMessageDropdown.innerHTML = "You must select  an item in the required list.";
        }
    }
    //validate organizations     
    var fields = ["UserTopOrganizationChoice", "UserSecondOrganizationChoice", "UserThirdOrganizationChoice", "UserFourthOrganizationChoice"];

    //clear existing error messages 
    errorOrganization.innerHTML = "";

    //check organization fields
    var i, fieldsLength = fields.length;
    var fieldname;
    for (i = 0; i < fieldsLength; i++) {
        fieldname = fields[i];
        //clear existing colors
        var fieldLabel = TT.$("#" + fieldname).attr("class", "errorInputClear");

        if (document.getElementById(fieldname).value === "Select") {
            fieldLabel = TT.$("#" + fieldname).attr("class", "errorInputActive");
            errorOrganization.innerHTML = "You must select an organization or select Not Listed.";
      }
        
    }
    //end of org validation
    if (errorOrganization.innerHTML === "" & errorAttendeeName.innerHTML === "" & errorCourseTitle.innerHTML === "" & errorDateCompleted.innerHTML === "" & errorIsActive.innerHTML === "") {
        return true;
    }
    else { return false; }
}


ET.TT.BindButtons = function () {
    "use strict";

  var arrayRequiredElements = ["UserTopOrganizationChoice", "UserSecondOrganizationChoice", "UserThirdOrganizationChoice", "UserFourthOrganizationChoice", "CoursesContainer", "ETPeoplePicker", "DateCompletedContainer", "ETPeoplePicker_TopSpan"];
    var elementTop = document.getElementById("UserTopOrganizationChoice");
  ET.TT.ClearRequiredElements.load(arrayRequiredElements);
    elementTop.onchange = function () {
        ET.TT.PopulateOrgLevel.secondChoice(this.value, this.id);
        ET.TT.WriteHiddenOrganizationFields.hideField(this.value, this.id);
        ET.TT.ClearSelectOrganization.clearOrg(this.value, this.id);

    }
    var elementSecond = document.getElementById("UserSecondOrganizationChoice");
    elementSecond.onchange = function () {
        ET.TT.PopulateOrgLevel.secondChoice(this.value, this.id);
        ET.TT.WriteHiddenOrganizationFields.hideField(this.value, this.id);
        ET.TT.ClearSelectOrganization.clearOrg(this.value, this.id);

    }
    var elementThird = document.getElementById("UserThirdOrganizationChoice");
    elementThird.onchange = function () {
        ET.TT.PopulateOrgLevel.secondChoice(this.value, this.id);
        ET.TT.WriteHiddenOrganizationFields.hideField(this.value, this.id);
        ET.TT.ClearSelectOrganization.clearOrg(this.value, this.id);

    }
    var elementFourth = document.getElementById("UserFourthOrganizationChoice");
    elementFourth.onchange = function () {

        ET.TT.WriteHiddenOrganizationFields.hideField(this.value, this.id);
    }

    var elementCourses = document.getElementById("CoursesContainer");
    elementCourses.onchange = function () {

        ET.TT.GetEventInfo.load(this.value);
    }

    var elementPeoplePicker = document.getElementById("ETPeoplePicker");
    ////$("#ETPeoplePicker").on('change keydown paste input', function () {
        ////onchange event doesn't fire
        elementPeoplePicker.onkeydown = function () {
        
            if (event.keyCode === 13) {
               
                if (this.value !== "" & this.value !== null) {
                  
                    getUserInfo();
                }
               
            }

        }
    
}