var ET = ET || {};
ET.TT = ET.TT || {};

TT.$ = jQuery.noConflict();

TT.$(document).ready(function () {
    "use strict";
    var currentParentOrganizationId = TT.$("input[title='ParentOrganizationId Required Field']").val();
    var isactive = TT.$("input[title='IsActive']").val();
    var today = ET.TT.getToday.currentDate();
    if (currentParentOrganizationId === "") {
        TT.$("#error").text("You cannot edit this organization. Click Cancel and select another organization.");
    } else {
        ET.TT.PopulateFirstLevel.load();

        //unique to this form

        //set current organization
        var currentOrganization = TT.$("input[title='Name']").val();
        TT.$("input[title='ModifiedDate']").val(today);
        TT.$("#currentOrganization").text(currentOrganization);
        ET.TT.GetCurrentParentOrganizationName.load(currentParentOrganizationId);
        //for edit form 
        var titleField = TT.$("input[title='UserTopOrganization']").val();
        TT.$("#labelTop").text(titleField);
        var titleFieldSecond = TT.$("input[title='UserSecondOrganization']").val();
        TT.$("#labelSecond").text(titleFieldSecond);
        var titleFieldThird = TT.$("input[title='UserThirdOrganization']").val();
        TT.$("#labelThird").text(titleFieldThird);
        var titleFieldFourth = TT.$("input[title='UserFourthOrganization']").val();
        TT.$("#labelFourth").text(titleFieldFourth);

        GetCreatedByUserLoginName();
        ET.TT.BindButtons();

        if (isactive === "Yes") {
            TT.$("#isActiveContainer").val("1");
        } else {
            TT.$("#isActiveContainer").val("2");
        }
        //populate if blank
        if (TT.$("input[title='CreatedDate']").val() === "") {
            TT.$("input[title='CreatedDate']").val(today);
        } else {
            TT.$("input[title='CreatedDate']").attr("readonly", "true").css("border", "None");

        }
    }

});
function PreSaveAction() {
    "use strict";

    var nameCurrent = TT.$("#currentOrganization").text();
    var nameUpdated = TT.$("#newOrganizationEdit").val();
    if (TT.$("#isActiveContainer").val() === "1") {
        TT.$("input[title=IsActive]").val("Yes");
    } else {

        TT.$("input[title=IsActive]").val("No");
    }

    if (nameUpdated === "" || nameUpdated === null) {

        TT.$("input[title='Name']").val(nameCurrent);

        return true;//save
    }
    else {

        TT.$("input[title='Name']").val(nameUpdated);

        return true;
    }

};

ET.TT.GetCurrentParentOrganizationName = (function () {
    "use strict";

    var load = function (currentParentOrganizationId) {

        var _query = _spPageContextInfo.webServerRelativeUrl + "/getbytitle('Organization')/items?$select=Name,RecordId,IsActive&$filter=(RecordId eq '" + currentParentOrganizationId + "')";

        TT.$.ajax(
            {
                cache: false,
                url: _query,
                type: 'GET',
                dataType: 'json',
                async: false,
                headers: {
                    "accept": "application/json;odata=verbose;charset=utf-8"
                },
                success: function (data) {
                    var _results = data.d.results, _receivedData = [];
                    if (data.d.results === "" || data.d.results.length === 0)//8-1 fixed problem of dropdowns clearing when nothing returned 8-13 fourth level not populating just empty
                    {

                        TT.$("#labelCurrentParent").text("Organization does not exist.");



                    } else {
                        TT.$.each(_results, function (i, item) {
                            _receivedData.push([_results[i].Name]);

                            var currentParentName = _results[i].Name;
                            TT.$("#labelCurrentParent").text(currentParentName);

                        });
                    }

                },
                error: function ajaxError(err) {
                    console.log(err)
                }


            });
    };
    return {
        load: load
    };
}());


//compare with function for new organization form, need different div name for updated organization
function search(ele) {
    "use strict";

    if (event.keyCode === 13) {
        //console.log(ele.value);
        if (ele.value !== "" & ele.value !== null) {
            var searchParentOrgId = TT.$("input[title='ParentOrganizationId Required Field']").val();

            ET.TT.CheckDupeOrganization.load(ele.value, searchParentOrgId);
        }
        else {
            TT.$("input[title='Name']").val("");
            document.getElementById("SuccessForm").innerHTML = "";
            document.getElementById("ErrorForm").innerHTML = "";



        }
    }
};

ET.TT.BindButtons = function () {
    "use strict";

    var elementTop = document.getElementById("UserTopOrganizationChoice");
    elementTop.onchange = function () {
        ET.TT.PopulateOrgLevel.secondChoice(this.value, this.id);
        ET.TT.WriteHiddenOrganizationFields.hideField(this.value, this.id);
        ET.TT.ClearSelectOrganization.clearOrg(this.value, this.id);
        ET.TT.GetOrganizationParentId.load(this.value, this.id);

    };
    var elementSecond = document.getElementById("UserSecondOrganizationChoice");
    elementSecond.onchange = function () {
        ET.TT.PopulateOrgLevel.secondChoice(this.value, this.id);
        ET.TT.WriteHiddenOrganizationFields.hideField(this.value, this.id);
        ET.TT.ClearSelectOrganization.clearOrg(this.value, this.id);
        ET.TT.GetOrganizationParentId.load(this.value, this.id);
    };
    var elementThird = document.getElementById("UserThirdOrganizationChoice");
    elementThird.onchange = function () {
        ET.TT.PopulateOrgLevel.secondChoice(this.value, this.id);
        ET.TT.WriteHiddenOrganizationFields.hideField(this.value, this.id);
        ET.TT.ClearSelectOrganization.clearOrg(this.value, this.id);
        ET.TT.GetOrganizationParentId.load(this.value, this.id);

    };
    var elementFourth = document.getElementById("UserFourthOrganizationChoice");
    elementFourth.onchange = function () {

        ET.TT.WriteHiddenOrganizationFields.hideField(this.value, this.id);
    };
    var elementOrganizationEdit = document.getElementById("newOrganizationEdit");
    elementOrganizationEdit.onkeydown = function () {

        search(this);
    };

};


