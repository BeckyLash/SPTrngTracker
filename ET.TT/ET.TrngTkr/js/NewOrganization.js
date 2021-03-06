var ET = ET || {};
ET.TT = ET.TT || {};
 
TT.$ = jQuery.noConflict();

TT.$(document).ready(function () {
    "use strict";       
    var today = ET.TT.getToday.currentDate();   
    ET.TT.PopulateFirstLevel.load();
    ET.TT.GetOrganizationParentId.load();   

    GetCreatedByUserLoginName();
    ET.TT.BindButtons();
    TT.$("#isActiveContainer").val("1");
    

    //must populate before make readonly
    TT.$("input[title='CreatedDate']").val(today);
    TT.$("input[title='ModifiedDate']").val(today);
    TT.$("input[title='DateCompleted']").val(today);
    
});
function PreSaveAction() {
    "use strict";
    
    var name = TT.$("input[title='Name']").val();
    var nameOrganization = TT.$("#newOrganization").val();
    //select an organization     
    var fields = ["UserTopOrganizationChoice", "UserSecondOrganizationChoice", "UserThirdOrganizationChoice", "UserFourthOrganizationChoice"];
    //check organization fields
    var i, fieldsLength = fields.length;
    var fieldname;
    for (i = 0; i < fieldsLength; i++) {
        fieldname = fields[i];
        if (document.getElementById(fieldname).value === "Select") {
            TT.$("#" + fieldname).attr("class", "errorInputActive");
        }
    }
   
        if (name === ""){
            document.getElementById("success").innerHTML = "";
            document.getElementById("error").innerHTML = "You cannot save this item. You must enter a new organization and press Enter to check for duplicates.";
            if (nameOrganization === "" || nameOrganization.match(/Enter a/g)) {
                TT.$("#newOrganization").attr("class", "errorInputActive");

            }
            var arrayRequiredElements = ["newOrganization"];

            ET.TT.ClearRequiredElements.load(arrayRequiredElements);//bind element here, not on document.load

            return false;
        }
        else {
        
        return true;
           }
    
};

function search(ele) {
    "use strict";

    if(event.keyCode === 13) {
         console.log(ele.value);
        if (ele.value !== "" & ele.value !== null){
            var searchParentOrgId = TT.$("input[title='ParentOrganizationId Required Field']").val();

        ET.TT.CheckDupeOrganization.load(ele.value, searchParentOrgId);
        } 
        else {
        TT.$("input[title='Name']").val("");
        document.getElementById("success").innerHTML = "";
        document.getElementById("error").innerHTML = "";


        
        }         
    }
};

//to do: rename .BindElements not .BindButtons
ET.TT.BindButtons = function () {
    "use strict";
    var elementTop = document.getElementById("UserTopOrganizationChoice");
    var arrayRequiredElements = ["UserTopOrganizationChoice", "UserSecondOrganizationChoice", "UserThirdOrganizationChoice", "UserFourthOrganizationChoice"];
    ET.TT.ClearRequiredElements.load(arrayRequiredElements);
    elementTop.onchange = function () {
        ET.TT.PopulateOrgLevel.secondChoice(this.value, this.id);
        ET.TT.WriteHiddenOrganizationFields.hideField(this.value, this.id);
        ET.TT.ClearSelectOrganization.clearOrg(this.value, this.id);
        ET.TT.GetOrganizationParentId.load(this.value, this.id);
        ET.TT.ClearTopOrganization(this.value);
        

    }
    var elementSecond = document.getElementById("UserSecondOrganizationChoice");
    elementSecond.onchange = function () {
        ET.TT.PopulateOrgLevel.secondChoice(this.value, this.id);
        ET.TT.WriteHiddenOrganizationFields.hideField(this.value, this.id);
        ET.TT.ClearSelectOrganization.clearOrg(this.value, this.id);
        ET.TT.GetOrganizationParentId.load(this.value, this.id);
        ET.TT.AddFirstChildOrganization.load(this.id);


    }
    var elementThird = document.getElementById("UserThirdOrganizationChoice");
    elementThird.onchange = function () {
        ET.TT.PopulateOrgLevel.secondChoice(this.value, this.id);
        ET.TT.WriteHiddenOrganizationFields.hideField(this.value, this.id);
        ET.TT.ClearSelectOrganization.clearOrg(this.value, this.id);
        ET.TT.GetOrganizationParentId.load(this.value, this.id);
        ET.TT.AddFirstChildOrganization.load(this.id);
        
    }
    var elementFourth = document.getElementById("UserFourthOrganizationChoice");
    elementFourth.onchange = function () {
        
        ET.TT.GetOrganizationParentId.load(this.value, this.id);
        ET.TT.AddFirstChildOrganization.load(this.id);
        
    }
   
   
}
