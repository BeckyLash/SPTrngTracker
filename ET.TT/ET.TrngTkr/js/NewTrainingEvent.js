var ET = ET || {};
ET.TT = ET.TT || {};
 
TT.$ = jQuery.noConflict();


TT.$(document).ready(function () {
    "use strict";
  
    var today = ET.TT.getToday.currentDate();
    TT.$("#isActiveContainer").val("1");
    GetCreatedByUserLoginName();
    ET.TT.BindButtons();
    TT.$("#appear").hide();
    TT.$("#RepeatDaysContainer").hide();

    initializePeoplePicker("ETPeoplePicker");
    
    TT.$("input[title='CreatedDate']").val(today);
    TT.$("input[title='ModifiedDate']").val(today);
    TT.$("input[title='DateCompleted']").val(today);
 
   
});

ET.TT.BindButtons = function () {
    "use strict";
    var elementPeoplePicker = document.getElementById("ETPeoplePicker");
    var elementRepeat = document.getElementById("repeatableContainer");
    var arrayRequiredElements = ["ETPeoplePicker", "trainingCourseTitleContainer", "mandatoryContainer", "repeatableContainer"];
    elementRepeat.onchange = function () {

        if (this.value === "1") {
            TT.$("#RepeatDaysContainer").show();

        }
        else if (this.value === "0" || this.value === "2") {
            TT.$("#RepeatDaysContainer").hide();
        }
    }

   ET.TT.ClearRequiredElements.load(arrayRequiredElements);

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


function PreSaveAction() {
    "use strict";
    ET.TT.SaveEventForm();
    //get error divs
    var errorCourseTitle = document.getElementById("ErrorCourseTitle");
    var errorManagerName = document.getElementById("ErrorManagerName");

    var errorMandatory = document.getElementById("ErrorMandatory");
    var errorRepeat = document.getElementById("ErrorRepeat");
    var errorNumberDays = document.getElementById("ErrorNumberDays");
    var errorIsActive = document.getElementById("ErrorIsActive");
    //get fields to validate
    var courseTitle = document.getElementById("trainingCourseTitleContainer");
    var managerName = document.getElementById("ETPeoplePicker");
    var mandatory = document.getElementById("mandatoryContainer");
    var repeat = document.getElementById("repeatableContainer");
    var numberDays = document.getElementById("repeatTimeContainer");
    var isActive = document.getElementById("isActiveContainer");

    //clear existing error messages
    errorCourseTitle.innerHTML = "";
    errorManagerName.innerHTML = "";
    errorMandatory.innerHTML = "";
    errorRepeat.innerHTML = "";
    errorNumberDays.innerHTML = "";
    errorIsActive.innerHTML = "";
    //clear existing formatting
    TT.$(courseTitle, managerName, mandatory, repeat, numberDays, isActive).attr("class", "errorInputClear");
    var fields = ["trainingCourseTitleContainer", "ETPeoplePicker"];
    var i, fieldsLength = fields.length;
    var fieldname;
    for (i = 0; i < fieldsLength; i++) {
        fieldname = fields[i];
        if (document.getElementById(fieldname).value === "") {

            var fieldLabel = TT.$("#" + fieldname).attr("class", "errorInputActive");
            errorCourseTitle.innerHTML = "You must enter information in the required boxes.";
            if (fieldname === "ETPeoplePicker") {
                TT.$("#" + fieldname).css({ 'border': '3px solid red' });//if use ETPeoplePicker_topspan, element not found, not able to change background of peoplepicker
            }

        }
    }

    var fieldsDropdownLists = ["mandatoryContainer", "repeatableContainer"];
    var x, fieldsLengthDropdown = fieldsDropdownLists.length;
    var fieldnameDropdown;
    for (x = 0; x < fieldsLengthDropdown; x++) {
        fieldnameDropdown = fieldsDropdownLists[x];

        if (document.getElementById(fieldnameDropdown).value === "0") {

            var fieldLabelDropdown = TT.$("#" + fieldnameDropdown).attr("class", "errorInputActive");
            errorMandatory.innerHTML = "You must select Yes  or No in the required lists.";
        }


    }
    //
    if (document.getElementById("repeatableContainer").value === "1" & (document.getElementById("repeatTimeContainer").value === "" || document.getElementById("repeatTimeContainer").value === 0)) {
        TT.$(numberDays).attr("class", "errorInputActive");
        errorRepeat.innerHTML = "You must enter the number of days.";
    }
    if (errorMandatory.innerHTML === "" & errorCourseTitle.innerHTML === "" & errorRepeat.innerHTML === "") {
        if (isActive.value === "1") {
            ET.TT.GetNewestEvent.load();
        }

        return true;
    }

    else { return false; }


};

