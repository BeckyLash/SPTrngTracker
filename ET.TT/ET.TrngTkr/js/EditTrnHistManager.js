var ET = ET || {};
ET.TT = ET.TT || {};
 
TT.$ = jQuery.noConflict();

TT.$(document).ready(function () {
    "use strict";

    var today = ET.TT.getToday.currentDate();

    var isactive = TT.$("input[title=IsActive]").val();
    //today = today.slice(0,11);//10/17/2016workaround - field not accepting seconds; problem does not appear on new and edit training history for employees
    today = today.slice(0, 11);
    TT.$("input[title='ModifiedDate']").val(today);
    ET.TT.PopulateFirstLevel.load();
    ET.TT.BindButtons();

    GetCreatedByUserLoginName();
    ET.TT.TrainingEventChoices.load();
    ET.TT.PopulateExistingTrainingHistoryManagerForm();

    //unique to this form  
    var titleField = TT.$("input[title='UserTopOrganization']").val();
    TT.$("#labelTop").text(titleField);
    var titleFieldSecond = TT.$("input[title='UserSecondOrganization']").val();
    TT.$("#labelSecond").text(titleFieldSecond);
    var titleFieldThird = TT.$("input[title='UserThirdOrganization']").val();
    TT.$("#labelThird").text(titleFieldThird);
    var titleFieldFourth = TT.$("input[title='UserFourthOrganization']").val();
    TT.$("#labelFourth").text(titleFieldFourth);
    initializePeoplePicker("ETPeoplePicker");

    //must populate

    TT.$("input[title='IsActive']").val("Yes");

    ET.TT.ButtonToolbarManagerForms.load();
    if (isactive === 'Yes') {
        TT.$("#isActiveContainer").val('1');
    }
    else {
        TT.$("#isActiveContainer").val('2');
    }
    //unique to this form - temporary fix for two Save buttons
    TT.$(".ms-toolbar").hide();

});
function PreSaveAction() {
    "use strict";
    //get error divs    
    var errorAttendeeName = document.getElementById("ErrorCurrentEmployeeContainer");
    var errorDateCompleted = document.getElementById("ErrorDateCompletedContainer");
    var errorIsActive = document.getElementById("ErrorisActiveContainer");
    var attendeeName = document.getElementById("CurrentEmployeeContainer");
    var dateCompleted = document.getElementById("DateCompletedContainer");
    var isActive = document.getElementById("isActiveContainer");
    //unique to this form
    ET.TT.SaveTrainingHistoryManagerForm();
    errorAttendeeName.innerHTML = "";
    errorDateCompleted.innerHTML = "";
    errorIsActive.innerHTML = "";
    //clear existing formatting
    TT.$(attendeeName, dateCompleted, isActive).attr("class", "errorInputClear");

    //validate text boxes 
    var fieldsText = ["DateCompletedContainer"];
    var y, fieldsLengthText = fieldsText.length;
    var fieldnameText;
    var errorMessageText;
    for (y = 0; y < fieldsLengthText; y++) {
        fieldnameText = fieldsText[y];
        if (document.getElementById(fieldnameText).value === "") {
            errorMessageText = document.getElementById("Error" + fieldnameText);
            errorMessageText.innerHTML = "You must enter information in the required box.";
            TT.$("#" + fieldnameText).attr("class", "errorInputActive");
        }
    }


    //validate peoplepicker
    if (attendeeName.innerHTML === "") {
        var fieldLabelText = TT.$("#ETPeoplePicker_TopSpan").attr("class", "errorInputActive");

        errorMessageText = document.getElementById("ErrorCurrentEmployeeContainer");
        errorMessageText.innerHTML = "You must select an employee name.";

        //return false;
    }
    //validate dropdown lists
    var fieldsDropdownLists = ["isActiveContainer"];
    var x, fieldsLengthDropdown = fieldsDropdownLists.length;
    var fieldnameDropdown;
    for (x = 0; x < fieldsLengthDropdown; x++) {
        fieldnameDropdown = fieldsDropdownLists[x];

        if (document.getElementById(fieldnameDropdown).value === "0" || document.getElementById(fieldnameDropdown).value === "SelectCourse") {

            var fieldLabelDropdown = TT.$("#" + fieldnameDropdown).css({ "background-color": "red" });

            var errorMessageDropdown = document.getElementById("Error" + fieldnameDropdown);
            errorMessageDropdown.innerHTML = "You must select  an item in the required list.";
        }
    }

    if (errorAttendeeName.innerHTML === "" & errorDateCompleted.innerHTML === "" & errorIsActive.innerHTML === "") {
        return true;
    }
}



ET.TT.BindButtons = function () {
    "use strict";

    var arrayRequiredElements = ["ETPeoplePicker", "DateCompletedContainer", "ETPeoplePicker_TopSpan"];
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
        var element = document.getElementById(this.id);
        var value = element.options[element.selectedIndex].text;//allows quotes for dropdown instead of this.id
        var restValue = ET.TT.RestFix.load(value);
        ET.TT.GetEventInfo.load(restValue);
    }
    var elementPeoplePicker = document.getElementById("ETPeoplePicker");

    ////onchange event doesn't fire
    elementPeoplePicker.onkeydown = function () {

        if (event.keyCode === 13) {

            if (this.value !== "" & this.value !== null) {

                getUserInfo();
            }
            else {



            }
        }

    }

}



