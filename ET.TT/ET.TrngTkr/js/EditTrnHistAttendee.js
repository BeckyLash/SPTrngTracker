var ET = ET || {};
ET.TT = ET.TT || {};
 
TT.$ = jQuery.noConflict();

TT.$(document).ready(function () {
    "use strict";

    var today = ET.TT.getToday.currentDate();
    var webUrl = "";
    webUrl = _spPageContextInfo.webServerRelativeUrl;
    ET.TT.PopulateFirstLevel.load();
    GetCreatedByUserLoginName();
    ET.TT.BindButtons();
      //unique to this form
    var titleField = TT.$("input[title='UserTopOrganization']").val();  
    TT.$("#labelTop").text(titleField);
    var titleFieldSecond = TT.$("input[title='UserSecondOrganization']").val();
    TT.$("#labelSecond").text(titleFieldSecond);
    var titleFieldThird = TT.$("input[title='UserThirdOrganization']").val();
    TT.$("#labelThird").text(titleFieldThird);
    var titleFieldFourth = TT.$("input[title='UserFourthOrganization']").val();
    TT.$("#labelFourth").text(titleFieldFourth); 
    TT.$("input[title='ModifiedDate']").val(today);
    ET.TT.ButtonToolbarAttendeeForms.load();

    
});

function PreSaveAction() {
    "use strict";
    
    var userEmail = TT.$("input[title=UserEmail]").val();

    if (userEmail === null || userEmail === "") {
        userEmail = TT.$("input[title=UserEmail]").css({ 'background-color': 'red' });//don't swap class for MS input
        document.getElementById("error").innerHTML = "You must enter an email.";

        return false;
    } else {
        
        var userNameCertificate = TT.$("input[title=UserName]").val();
        var completionDate = TT.$("input[title=DateCompleted]").val();
        completionDate = completionDate.substring(0, 10);
        var courseName = TT.$("input[title=TitleOfEvent]").val();
        //close parent window and display certificate
        ET.TT.DisplayCertificate.load(userNameCertificate, completionDate, courseName);
        return true;
    }
   
}

ET.TT.BindButtons = function () {
    "use strict";
    var elementTop = document.getElementById("UserTopOrganizationChoice");
    TT.$("input[title='UserEmail']")
        .click(
            function () {
                TT.$("input[title=UserEmail]").css({ 'background-color': 'white' });//don't swap class for MS input
            });
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
