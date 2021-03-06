var ET = ET || {};
ET.TT = ET.TT || {};
 
TT.$ = jQuery.noConflict();

TT.$(document).ready(function () {
        "use strict";
        var today = ET.TT.getToday.currentDate();
        
        ET.TT.PopulateFirstLevel.load();
        ET.TT.TrainingEvent.load();
        GetCreatedByUserLoginName();
        ET.TT.BindButtons();     
    
    TT.$("input[title='CreatedDate']").val(today);
    TT.$("input[title='ModifiedDate']").val(today);
    TT.$("input[title='DateCompleted']").val(today);
    TT.$("input[title=IsActive]").val("Yes");
    ET.TT.ButtonToolbarAttendeeForms.load();
    
});

function PreSaveAction() {
    "use strict";

    var errorEmail = document.getElementById("error");
    var errorOrganization = document.getElementById("ErrorOrg");
    var userEmail = TT.$("input[title=UserEmail]").val();
    //select an organization     
    var fields = ["UserTopOrganizationChoice", "UserSecondOrganizationChoice", "UserThirdOrganizationChoice", "UserFourthOrganizationChoice"];
   
    //clear existing error messages 
    errorOrganization.innerHTML = "";
    errorEmail.innerHTML = "";
    var userEmailFormat = TT.$("input[title=UserEmail]").css({ 'background-color': 'white' });//do not swap MS form class

    //check organization fields
    var i, fieldsLength = fields.length;
    var fieldname;
    for (i = 0; i < fieldsLength; i++) {
        fieldname = fields[i];
        if (document.getElementById(fieldname).value === "Select") {
            errorOrganization.innerHTML = "You must select an organization or select Not Listed.";
            TT.$("#" + fieldname).attr("class", "errorInputActive");
        }
    }
       
        if (userEmail === null || userEmail === "") {
            userEmailFormat = TT.$("input[title=UserEmail]").css({'background-color' : 'red'});
           
            errorEmail.innerHTML = "You must enter an email.";
        }
        if (errorOrganization.innerHTML === "" & errorEmail.innerHTML === "")

        {
            var userNameCertificate = TT.$("input[title=UserName]").val();
            var completionDate = TT.$("input[title=DateCompleted]").val();
            completionDate = completionDate.substring(0, 10);
            var courseName = TT.$("input[title=TitleOfEvent]").val();
            //close parent window and display certificate
            ET.TT.DisplayCertificate.load(userNameCertificate, completionDate, courseName);
            return true;
        }
        else {return false;}
}


ET.TT.BindButtons = function () {
    "use strict";

    var elementTop = document.getElementById("UserTopOrganizationChoice");
    var arrayRequiredElements = ["UserTopOrganizationChoice", "UserSecondOrganizationChoice", "UserThirdOrganizationChoice", "UserFourthOrganizationChoice"];
    TT.$("input[title='UserEmail']").click(
            function() {
                TT.$("input[title=UserEmail]").css({ 'background-color': 'white' });//do not toggle MS form class
            });
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

}

