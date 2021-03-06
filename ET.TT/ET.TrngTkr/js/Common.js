var ET = ET || {};
ET.TT = ET.TT || {};
TT.$ = jQuery.noConflict();

//used getdata.load
ET.TT.PopulateFirstLevel = (function () {
    "use strict";
    var _combo = "", _optionName = "";
    //clear control
    TT.$('#UserSecondOrganizationChoice').find('option').remove().end();
    TT.$('#UserSecondOrganizationChoice').append("<option value='NoChoices'>No choices</option>");
    TT.$('#UserThirdOrganizationChoice').find('option').remove().end();
    TT.$('#UserThirdOrganizationChoice').append("<option value='NoChoices'>No choices</option>");
    TT.$('#UserFourthOrganizationChoice').find('option').remove().end();
    TT.$('#UserFourthOrganizationChoice').append("<option value='NoChoices'>No choices</option>");  //end clear control   
    var load = function () {

        var _query = _spPageContextInfo.webServerRelativeUrl + "/getbytitle('Organization')/items?$select=Name,ParentOrganizationId,IsActive&$filter=((ParentOrganizationId eq '797') and (IsActive eq 'Yes'))";
        TT.$.ajax({
            cache: false,
            url: _query,
            type: 'GET',
            dataType: 'json',
            async: false,
            headers: {
                "accept": "application/json;odata=verbose;charset=utf-8"
            },

            success: function (data) {
                _combo = document.getElementById("UserTopOrganizationChoice");
                TT.$(_combo).append("<option value='Select' >Select an organization ...</option><option value='Notlisted' >Not listed</option>");

                var _results = data.d.results,
                _receivedData = [];
                TT.$.each(_results, function (i, item) {
                    _receivedData.push("Name: " + [_results[i].Name]);
                    _optionName = _results[i].Name;
                    TT.$(_combo).append("<option value='" + _optionName + "'>" + _optionName + "</option>");

                });
            },
            error: function ajaxError(response) {
                console.log(response.status + " " + response.statusText);
            }

        });
    };
    return {
        load: load
    };
}());

ET.TT.PopulateOrgLevel = (function () {
    "use strict";
    var parentOrganizationId = "";
    var secondChoice = function (selectedValue, parentElementId) {
        var webUrl = _spPageContextInfo.webServerRelativeUrl;
        var childElementId;
        selectedValue = encodeURIComponent(selectedValue);

        switch (parentElementId) {
            case "UserTopOrganizationChoice":
                childElementId = "UserSecondOrganizationChoice";
                TT.$("#UserSecondOrganizationChoice").find("option").remove().end();
                TT.$("#UserSecondOrganizationChoice").append("<option value='NoChoices'>No choices</option>");
                TT.$("#UserThirdOrganizationChoice").find("option").remove().end();
                TT.$("#UserThirdOrganizationChoice").append("<option value='NoChoices'>No choices</option>");
                TT.$("#UserFourthOrganizationChoice").find("option").remove().end();
                TT.$("#UserFourthOrganizationChoice").append("<option value='NoChoices' >No choices</option>");
                break;
            case "UserSecondOrganizationChoice":
                childElementId = "UserThirdOrganizationChoice";
                TT.$("#UserThirdOrganizationChoice").find("option").remove().end();
                TT.$("#UserThirdOrganizationChoice").append("<option value='NoChoices' >No choices</option>");
                TT.$("#UserFourthOrganizationChoice").find("option").remove().end();
                TT.$("#UserFourthOrganizationChoice").append("<option value='NoChoices' >No choices</option>");
                break;
            case "UserThirdOrganizationChoice":
                childElementId = "UserFourthOrganizationChoice";
                TT.$("#UserFourthOrganizationChoice").find("option").remove().end();
                TT.$("#UserFourthOrganizationChoice").append("<option value='NoChoices' >No choices</option>");
                break;
            default:
                childElementId = "";

        }


        TT.$.ajax({
            cache: false,
            url: webUrl + "/_api/web/lists/getbytitle('Organization')/items?$select=Name,RecordId,IsActive&$filter=(Name eq '" + selectedValue + "') and  (IsActive eq 'Yes')&$orderby=Name asc",

            type: 'GET',
            dataType: 'json',
            async: false,
            headers: {
                "accept": "application/json;odata=verbose;charset=utf-8"
            },
            success: function (data) {

                TT.$.each(data.d.results, function (i, result) {
                    parentOrganizationId = result.RecordId;

                });

            }, //end of success
            error: function ajaxError(response) {
                console.log(response.status + " " + response.statusText);
            }

        }); //end of ajax


        //get child lookup
        //break for not listed
        if (selectedValue !== "Notlisted") {
            //clear existing from child list
            TT.$('#' + childElementId).find('option').remove().end();//problem with item clearing


            //end break for not list 
            TT.$.ajax({
                cache: false,

                url: webUrl + "/_api/web/lists/getbytitle('Organization')/items?$select=Name,RecordId,ParentOrganizationId,IsActive&$filter=(ParentOrganizationId eq '" + parentOrganizationId + "') and (IsActive eq 'Yes')&$orderby=Name asc",

                type: 'GET',
                dataType: 'json',
                async: false,
                headers: {
                    "accept": "application/json;odata=verbose;charset=utf-8"
                },
                success: function (data) {

                    var combo = document.getElementById(childElementId);
                    TT.$(combo).append("<option value='Select' >Select an organization ...</option><option value='Notlisted' >Not listed</option>");

                    if (data.d.results === "" || data.d.results.length === 0)//8-1 fixed problem of dropdowns clearing when nothing returned 8-13 fourth level not populating just empty
                    {
                        TT.$("#" + childElementId).find("option").remove().end();
                        TT.$("#" + childElementId).append("<option value='NoChoices' >No choices</option>");//new 8-1
                        var selectedValueChildElement = "Notlisted";
                        ET.TT.WriteHiddenOrganizationFields.hideField(selectedValueChildElement, childElementId);
                    } else {
                        TT.$.each(data.d.results, function (i, result) {


                            var optionName = result.Name;
                            TT.$(combo).append("<option value='" + optionName + "'>" + optionName + "</option>");
                        });
                        //end here

                        var usedNames = {};
                        TT.$("#" + childElementId + " > option").each(function () {
                            //eliminate dupes
                            //if (usedNames[this.value]) {
                            // TT.$(this).remove();
                            // }
                            //  else {
                            usedNames[this.value] = this.value;
                            // }

                        });//end of jquery_each
                    }
                },
                //end of success
                error: function (msg, url, line) {


                },
                complete: function () { }
            });
            //end of ajax
        }//end of ifthen




    };//end secondChoice

    return {

        secondChoice: secondChoice

    };

})();


ET.TT.getToday = (function () {
    "use strict";
    var currentDate = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var seconds = today.getSeconds();
        var strTime = hours + ":" + minutes + ":" + seconds;

        if (dd < 10) {
            dd = "0" + dd;
        }

        if (mm < 10) {
            mm = "0" + mm;
        }


        today = mm + "/" + dd + "/" + yyyy + " " + strTime;

        return today;
    };
    return {

        currentDate: currentDate
    };
}());


//populate fields with querystring value
//used getdata.load
ET.TT.TrainingEvent = (function () {
    "use strict";

    var queryStringUrl = function (field, url) {
        var href = url ? url : window.location.href;//url optional
        var reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
        var string = reg.exec(href);
        return string ? string[1] : null;
    };

    var load = function () {

        var _eventId = ET.TT.TrainingEvent.queryStringUrl("TrainingEventId");
        var _query = "/getbytitle('TrainingEvent')/items?$select=Title,RecordId,IsActive&$filter=(RecordId eq '" + _eventId + "') and (IsActive eq 'Yes')&$orderby=Title asc";

        TT.$("input[title='TrainingEventId']").val(_eventId);
        TT.$.ajax({
            cache: false,
            url: _spPageContextInfo.webServerRelativeUrl + _query,

            type: 'GET',
            dataType: 'json',
            async: false,
            headers: {
                "accept": "application/json;odata=verbose;charset=utf-8"
            },


            success: (function (data) {
                var _results = data.d.results,
                _receivedData = [];
                TT.$.each(_results, function (i, item) {
                    _receivedData.push([_results[i].Title]);
                    var _eventName = _results[i].Title;
                    TT.$("input[title='TitleOfEvent']").val(_eventName);
                    TT.$("#CourseTitleContainer").append(_eventName);
                });
            }),

            failure: (function (err) {
                console.log(err)
            })
        });
    };
    return {
        queryStringUrl: queryStringUrl,
        load: load
    };
}());


ET.TT.WriteHiddenOrganizationFields = (function () {
    "use strict";
    var _hiddenElementTitle = "", hideField = "";
    hideField = function (selectedValue, elementId) {
        switch (elementId) {
            case "UserTopOrganizationChoice":
                //write to corresponding element
                _hiddenElementTitle = "UserTopOrganization";
                if (selectedValue === "Notlisted" || selectedValue === "NoChoices") {
                    TT.$("input[title='UserTopOrganization']").val("Not listed");
                    TT.$("input[title='UserSecondOrganization']").val("Not listed");
                    TT.$("input[title='UserThirdOrganization']").val("Not listed");
                    TT.$("input[title='UserFourthOrganization']").val("Not listed");

                }
                else {

                    TT.$("input[title='" + _hiddenElementTitle + "']").val(selectedValue);

                }
                break;
            case "UserSecondOrganizationChoice":
                _hiddenElementTitle = "UserSecondOrganization";
                if (selectedValue === "Notlisted" || selectedValue === "NoChoices") {
                    TT.$("input[title='UserSecondOrganization']").val("Not listed");
                    TT.$("input[title='UserThirdOrganization']").val("Not listed");
                    TT.$("input[title='UserFourthOrganization']").val("Not listed");

                }
                else {

                    TT.$("input[title='" + _hiddenElementTitle + "']").val(selectedValue);

                }
                break;
            case "UserThirdOrganizationChoice":
                _hiddenElementTitle = "UserThirdOrganization";
                if (selectedValue === "Notlisted" || selectedValue === "NoChoices") {

                    TT.$("input[title='UserThirdOrganization']").val("Not listed");
                    TT.$("input[title='UserFourthOrganization']").val("Not listed");

                }
                else {

                    TT.$("input[title='" + _hiddenElementTitle + "']").val(selectedValue);

                }
                break;

            default:
                _hiddenElementTitle = "UserFourthOrganization";
                if (selectedValue === "Notlisted" || selectedValue === "NoChoices") {
                    TT.$("input[title='UserFourthOrganization']").val("Not listed");

                }
                else {

                    TT.$("input[title='" + _hiddenElementTitle + "']").val(selectedValue);

                }
        }
    };
    return {
        hideField: hideField

    };

})();

ET.TT.ClearSelectOrganization = (function () {
    "use strict";
    var clearOrg = "";

    clearOrg = function (selectedValue, parentElementId) {

        if (selectedValue === "Select") {
            switch (parentElementId) {
                case "UserTopOrganizationChoice":
                    //write to corresponding element
                    TT.$('#UserSecondOrganizationChoice').find('option').remove().end();
                    TT.$('#UserSecondOrganizationChoice').append("<option value='NoChoices'>No choices</option>");
                    TT.$('#UserThirdOrganizationChoice').find('option').remove().end();
                    TT.$('#UserThirdOrganizationChoice').append("<option value='NoChoices'>No choices</option>");
                    TT.$('#UserFourthOrganizationChoice').find('option').remove().end();
                    TT.$('#UserFourthOrganizationChoice').append("<option value='NoChoices'>No choices</option>");
                    break;
                case "UserSecondOrganizationChoice":

                    TT.$('#UserThirdOrganizationChoice').find('option').remove().end();
                    TT.$('#UserThirdOrganizationChoice').append("<option value='NoChoices'>No choices</option>");
                    TT.$('#UserFourthOrganizationChoice').find('option').remove().end();
                    TT.$('#UserFourthOrganizationChoice').append("<option value='NoChoices'>No choices</option>");
                    break;
                case "UserThirdOrganizationChoice":

                    TT.$('#UserFourthOrganizationChoice').find('option').remove().end();
                    TT.$('#UserFourthOrganizationChoice').append("<option value='NoChoices'>No choices</option>");
                    break;
                default:
                    TT.$('#UserFourthOrganizationChoice').find('option').remove().end();
                    TT.$('#UserFourthOrganizationChoice').append("<option value='NoChoices'>No choices</option>");
            }

        }

    };
    return {
        clearOrg: clearOrg
    };

})();
//8-26 use only in New Training History Manager form
//used getdata.load
ET.TT.TrainingEventChoices = (function () {
    "use strict";

    var _titleTrainingEvent;

    var load = function () {
        var _query = "/getbytitle('TrainingEvent')/items?$select=Title,RecordId,IsActive&$filter=(IsActive eq 'Yes')&$orderby=Title asc";
        TT.$.ajax({
            cache: false,
            url: _spPageContextInfo.webServerRelativeUrl + _query,


            type: 'GET',
            dataType: 'json',
            async: false,
            headers: {
                "accept": "application/json;odata=verbose;charset=utf-8"
            },
            success: (function (data) {
                var combo = document.getElementById("CoursesContainer");
                TT.$(combo).append("<option value='SelectCourse' >Select a course ...</option>");
                var _results = data.d.results,
                _receivedData = [];
                TT.$.each(_results, function (i, item) {
                    _receivedData.push(["Title: " + _results[i].Title]);
                    _titleTrainingEvent = _results[i].Title;

                    TT.$(combo).append("<option value='" + _titleTrainingEvent + "'>" + _titleTrainingEvent + "</option>");
                });


            }),
            failure: (function (err) {
                console.log(err)
            })
        });
    };
    return {

        load: load
    };
}());


ET.TT.GetEventInfo = (function () {
    "use strict";
    var eventTitle = "", eventId = "";
    var load = function (selectedValue) {

        var _query = "/GetByTitle('TrainingEvent')/items?$select=RecordId,Title&$filter=(Title eq '" + encodeURIComponent(selectedValue) + "')&$orderby=Title asc";//removed quotes
        TT.$.ajax({
            cache: false,
            url: _spPageContextInfo.webServerRelativeUrl + _query,


            type: 'GET',
            dataType: 'json',
            async: false,
            headers: {
                "accept": "application/json;odata=verbose;charset=utf-8"
            },
            success: (function (data) {
                var _results = data.d.results,
                _receivedData = [];
                TT.$.each(_results, function (i, item) {
                    _receivedData.push("Id: " + [_results[i].RecordId, "Title: " + _results[i].Title]);
                    eventTitle = _results[i].Title;
                    eventId = _results[i].RecordId;
                    TT.$("input[title='TitleOfEvent']").val(eventTitle);
                    TT.$("input[title='TrainingEventId']").val(eventId);
                });


            }),
            failure: (function (err) {
                console.log(err)
            })
        });
    };
    return {
        eventTitle: eventTitle,
        eventId: eventId,
        load: load
    };
}());

ET.TT.GetNewestEvent = (function () {
    "use strict";
    var load = function () {
        var _win = window.open("", "Completion link for training event");
        var _eventTitle = document.getElementById("trainingCourseTitleContainer").value;

        var _url = window.location.pathname;
        if (_url.indexOf('EditForm.aspx') > -1) {
            //get BDC id from URL
            var _itemBdcId = GetUrlKeyValue("ID", false, location.href);
            //console.log(_itemBdcId);
            var _query = "/GetByTitle('TrainingEvent')/items?$select=BdcIdentity,RecordId,Title&$filter=(BdcIdentity eq '" + _itemBdcId + "')";

            TT.$.ajax({
                cache: false,
                url: _spPageContextInfo.webServerRelativeUrl + _query,
                type: 'GET',
                dataType: 'json',
                async: false,
                headers: {
                    "accept": "application/json;odata=verbose;charset=utf-8"
                },
                success: (function (data) {
                    var _results = data.d.results,
                    _receivedData = [];
                    TT.$.each(_results, function (i, item) {
                        _receivedData.push("Id: " + [_results[i].RecordId, "Title: " + _results[i].Title]);
                        var _eventId = _results[i].RecordId;
                        ET.TT.EventFormPopup.load(_eventTitle, _eventId, _win);
                    });
                }),

                failure: (function (err) {
                    console.log(err)
                })
            });

        }
        else {
            // if not edit, but new item, get max id ie newest event then load popup on success
            var _query = "/GetByTitle('TrainingEvent')/items?$select=RecordId,Title&$top=1&$orderby=RecordId desc";
            TT.$.ajax({
                cache: false,
                url: _spPageContextInfo.webServerRelativeUrl + _query,
                type: 'GET',
                dataType: 'json',
                async: false,
                headers: {
                    "accept": "application/json;odata=verbose;charset=utf-8"
                },
                success: (function (data) {
                    var _results = data.d.results,
                    _receivedData = [];
                    TT.$.each(_results, function (i, item) {
                        _receivedData.push("Id: " + [_results[i].RecordId, "Title: " + _results[i].Title]);
                        var _eventId = _results[i].RecordId + 1;
                        ET.TT.EventFormPopup.load(_eventTitle, _eventId, _win);

                    });
                }),

                failure: (function (err) {
                    console.log(err)
                })
            });
        }

    };
    return {

        load: load
    };
}());

ET.TT.EventFormPopup = (function () {
    "use strict";
    var webUrl = _spPageContextInfo.webServerRelativeUrl,
    createEventLink = function (eventId) {
        var trainingEventLink1 = window.location.protocol + "//" + window.location.hostname + webUrl;
        var trainingEventLink2 = "/Lists/TrainingHistory/NewForm.aspx?TrainingEventId=" + eventId;
        var trainingEventLink3 = "&Source=" + webUrl;
        var eventLink = trainingEventLink1 + trainingEventLink2 + trainingEventLink3;
        return eventLink;
    },

        load = function (eventTitle, eventId, win) {

            var html1 = "<html><head><link rel='stylesheet' type='text/css' href='/_layouts/15/1033/styles/Themable/corev15.css'/>";
            var html2 = "<link rel='stylesheet' type='text/css' href='" + window.location.protocol + "//" + window.location.hostname + webUrl;
            var html3 = "/_catalogs/masterpage/ET.TrngTkr/css/Certificate.css'/> <style media ='print' type='text/css'>#printButton {display:none;}</style>";
            var html4 = "</head><Body id='BodyCertificate'>";
            var htmlBody1 = "<div class='divCertificate'><div class='CertificateInner'><h1 class='event'>";
            var htmlBody2 = "Link to record training completion</h1>";
            var htmlBody3 = "<h2 class='event'>You must implement the following link to allow employees to record their training completion. ";
            var htmlBody4 = "To implement the link, copy it from the browser window and paste the link into the area, such as a page, screen, or email,";
            var htmlBody5 = "where you want employees to record their training completion. ";
            var htmlBody6 = "For more information, see the ET Mandatory Training Tracker ";
            var htmlBody7 = "Manager's Guide.</h2><h2 class='event'> ";
            var htmlBody8 = "Event title: " + eventTitle + "</h2><h2 class='event'>Link to record training completion:</h2>";
            var htmlBody9 = "<h2 id='copyTarget' class='event'>" + ET.TT.EventFormPopup.createEventLink(eventId) + "</h2><p class='event'>";
            var htmlBody10 = "<span id='printButton'<div id='printButton'>To print this document, in the browser, select Tools > Print.</span></p>";
            var htmlBody11 = "<p class='event'><button id='copyButton'>Copy link to Clipboard</button></p></div></div></div>";
            var htmlBody12 = "<script type='text/javascript' src='" + window.location.protocol + "//" + window.location.hostname + webUrl + "/_catalogs/masterpage/ET.TrngTkr/js/CopytoClipboard.js'></script>";

            var htmlClose = "</body></html>";


            win.document.open();
            win.document.write(html1 + html2 + html3 + html4);
            win.document.write(htmlBody1 + htmlBody2 + htmlBody3 + htmlBody4 + htmlBody5 + htmlBody6 + htmlBody7);
            win.document.write(htmlBody8 + htmlBody9 + htmlBody10 + htmlBody11 + htmlBody12);
            win.document.write(htmlClose);
            win.focus();
        };
    return {
        createEventLink: createEventLink,
        load: load
    };
}());

ET.TT.ButtonToolbarAttendeeForms = (function () {
    "use strict";
    var load = function () {
        //hide save and cancel buttons at bottom and reposition default email, save, and cancel       
        TT.$("input[title=UserEmail]").insertAfter(TT.$("#Email"));

        TT.$("#ButtonToolbar").append(TT.$("input[value=Save]:first"));
        TT.$("input[value=Cancel]:first").insertAfter(TT.$("input[value=Save]"));

        // hide multiple buttons
        TT.$(".ms-toolbar").hide();

    };
    return {

        load: load
    };
}());

//clear red from required elements
ET.TT.ClearRequiredElements = (function () {
    "use strict";
    var load = function (arrayElements) {
        for (var i in arrayElements) {
            var element = document.getElementById(arrayElements[i]);
            if ((typeof element) !== "undefined") {
                element.onclick = function () {
                    this.style.backgroundColor = "white";
                }
            }

        }
    };
    return {
        load: load
    };
}());

ET.TT.RestFix = (function () {
    "use strict";
    var load = function (string) {
        return string = string.replace(/'/g, "''");//fix quotes in REST call
    };
    return {
        load: load
    };
}());
//organizations
ET.TT.GetOrganizationParentId = (function () {
    "use strict";
    var parentId = "";
    var parentOrganization = "";
    var parentOrganizationId = "", name = "";
  
    var load = function (selectedValue, selectedId) {
        var orgDiv = "";
        var messageNoOrg = document.createElement("LABEL");
        messageNoOrg.setAttribute("id", "messageNoOrg");
        TT.$("#messageNoOrg").remove();
        TT.$("#newOrganization").remove();//fixes problem of duplicate entry boxes

        if (selectedValue !== "Select" & selectedValue !== "Notlisted" & selectedValue !== "NoChoices") {

            selectedValue = encodeURIComponent(selectedValue);
            //get parent id first
            switch (selectedId) {
                //go backwards to eliminate possible last selected
                case "UserThirdOrganizationChoice":
                    parentOrganization = selectedValue;
                    break;
                case "UserSecondOrganizationChoice":
                    parentOrganization = selectedValue;
                    break;
                case "UserTopOrganizationChoice":
                    parentOrganization = selectedValue;
                    break;
                default: //UserFourthORganizationChoice
                    //parentOrganization = "";
                    break;


            }
        }
        var _query = "/getbytitle('Organization')/items?$select=Name,RecordId&$filter=(Name eq '" + parentOrganization + "') and (IsActive eq 'Yes')";

        //get parent id to populate default form field
        TT.$.ajax({
            cache: false,
            url: _spPageContextInfo.webServerRelativeUrl + _query,


            type: 'GET',
            dataType: 'json',
            async: false,
            headers: {
                "accept": "application/json;odata=verbose;charset=utf-8"
            },

            success: function (data) {
                var _results = data.d.results,
                _receivedData = [];
                TT.$.each(_results, function (i, item) {
                    _receivedData.push([_results[i].RecordId]);


                    console.log(JSON.stringify(data));

                    if (data.d.results === "" || data.d.results.length === 0)//prevents dropdowns clearing when nothing returned 8-13 fourth level not populating just empty
                    {
                        Console.log("data set is empty");

                    } else {
                        TT.$.each(data.d.results, function (i, result) {

                            //write result hidden sharepoint field
                            parentOrganizationId = _results[i].RecordId;

                            if (selectedValue === "Notlisted") {

                                selectedValue = encodeURIComponent(selectedValue);
                                ET.TT.AddNewOrganization.load(selectedId);
                            }

                            TT.$("input[title='ParentOrganizationId Required Field']").val(parentOrganizationId);
                            TT.$("input[title='Name']").val(name);//keep for edit item breaks new item form
                            TT.$("input[title='IsActive']").val("Yes");                       //end new

                        });

                    }

                });
            },

            failure: function (err) {
                console.log(err);

            }

        });

    };


    return {
        parentId: parentId,
        parentOrganization: parentOrganization,
        parentOrganizationId: parentOrganizationId,
        name: name,
        load: load
    };

}());

ET.TT.CheckDupeOrganization = (function () {
    "use strict";

    var _name = TT.$("#newOrganization").val();
    var load = function (selectedValue, searchParentOrgId) {

        var _query = "/getbytitle('Organization')/items?$select=Name,RecordId,ParentOrganizationId,IsActive&$filter=(Name eq '" + encodeURIComponent(selectedValue) + "') and (ParentOrganizationId eq '" + searchParentOrgId + "')";

        TT.$.ajax(

{
    cache: false,
    url: _spPageContextInfo.webServerRelativeUrl + _query,


    type: 'GET',
    dataType: 'json',
    async: false,
    headers: {
        "accept": "application/json;odata=verbose;charset=utf-8"
    },

    success: (function (data) {
        var _results = data.d.results,
        _receivedData = [];
        if (data.d.results === "" || data.d.results.length === 0) {
            document.getElementById("error").innerHTML = "";
            document.getElementById("success").innerHTML = "The new organization does not exist in the database. You can click the Save button.";
            var containerName = document.getElementById("newOrganization").value;
            console.log(containerName);
            TT.$("input[title='Name']").val(containerName);//populates hidden field


        } else {
            TT.$.each(_results, function (i, item) {
                _receivedData.push([_results[i].IsActive]);

                if (_results[i].IsActive === "Yes") {
                    document.getElementById("error").innerHTML = "";
                    document.getElementById("success").innerHTML = "";
                    document.getElementById("error").innerHTML = "The new organization exists in the database. Enter a different name.";


                }
                else if (_results[i].IsActive === "No") {
                    document.getElementById("success").innerHTML = "";
                    document.getElementById("error").innerHTML = "The new organization exists in the database, however the organization is not active and does not appear on the list. Contact your administrator.";

                }


            });
        }



    }),
    failure: (function (err) {
        console.log(err)
    })
})
    };
    return {

        load: load
    };
}());

ET.TT.ClearTopOrganization = function (elementValue) {
    "use strict";
    var messageNoOrg = document.getElementById("newOrganizationContainerTop");
    messageNoOrg.innerHTML = "";
    if (elementValue === "Notlisted") {
        messageNoOrg.innerHTML = "You cannot create a top level organization. For assistance, contact the GITOC Service Desk.";

    } else {


        messageNoOrg.innerHTML = "";



    }
};


ET.TT.AddNewOrganization = (function () {
    "use strict";

    var load = function (selectedId) {



        TT.$("#newOrganization").remove();//prevent dupe boxes
        var orgDiv = document.createElement("input");
        orgDiv.setAttribute("type", "text");
        orgDiv.setAttribute("onkeydown", "search(this)");
        orgDiv.id = "newOrganization";

        //get parent id first
        switch (selectedId) {
            //go backwards to eliminate possible last selected
            case "UserFourthOrganizationChoice":
                TT.$("#appear").show();
                orgDiv.setAttribute("placeholder", "Enter a fourth level organization");
                document.getElementById("newOrganizationContainerFourth").appendChild(orgDiv);
                break;
            case "UserThirdOrganizationChoice":
                TT.$("#appear").show();
                orgDiv.setAttribute("placeholder", "Enter a third level organization");
                document.getElementById("newOrganizationContainerThird").appendChild(orgDiv);

                break;
            case "UserSecondOrganizationChoice":

                //remove from other rows
                TT.$("#appear").show();
                orgDiv.setAttribute("placeholder", "Enter a second level organization");
                document.getElementById("newOrganizationContainerSecond").appendChild(orgDiv);
                break;
            case "UserTopOrganizationChoice":
                ET.TT.ClearTopOrganization("Notlisted");
                break;

            default://userTopORganizationChoice             

                ET.TT.ClearTopOrganization("Notlisted");
        }
    };
    return {

        load: load
    };
}());

ET.TT.AddFirstChildOrganization = (function () {
    "use strict";

    var load = function (selectedId) {
        var noChoice = "NoChoices";
        var notListed = "Notlisted";
        var selectOrg = "Select";
        var secondElement = document.getElementById("UserSecondOrganizationChoice").value;
        var thirdElement = document.getElementById("UserThirdOrganizationChoice").value;
        var fourthElement = document.getElementById("UserFourthOrganizationChoice").value;
        if (secondElement !== notListed && secondElement !== selectOrg && secondElement !== noChoice) {
            if (thirdElement === noChoice && fourthElement === noChoice) {
                ET.TT.AddNewOrganization.load("UserThirdOrganizationChoice");
            }
            if (thirdElement !== notListed && thirdElement !== selectOrg && thirdElement !== noChoice) {
                if (fourthElement === noChoice) {
                    ET.TT.AddNewOrganization.load("UserFourthOrganizationChoice");
                }
            }
        }

    };
    return {

        load: load
    };
}());
//end organizations
//events
ET.TT.SaveEventForm = function () {
    "use strict";

    var managerName = TT.$("#ETPeoplePicker").text().slice(32, -1); //trim extra "select ..." text
    if (managerName !== undefined & managerName !== "") {
        TT.$("input[title='TrainingManagerName']").val(managerName);
        TT.$("#CurrentEmployeeContainer").text(managerName);
        TT.$("#ErrorCurrentEmployeeContainer").text("");
        var fieldLabelText = TT.$("#ETPeoplePicker_TopSpan").attr("class", "errorInputClear");

    }
    getUserInfo();
    var courseTitle = TT.$("#trainingCourseTitleContainer").val();
    var courseOperationOrder = TT.$("#operationOrderContainer").val();
    var courseTimeSpan = TT.$("#repeatTimeContainer").val();
    var linkToCourseware = TT.$("#linkToCoursewareContainer").val();
    //  //populate form fields

    TT.$("input[title='Title']").val(courseTitle);
    TT.$("input[title='OperationOrder']").val(courseOperationOrder);
    TT.$("input[title='CompletionTimeSpan']").val(courseTimeSpan);
    TT.$("input[title='LinkToCourseware']").val(linkToCourseware);
    if (TT.$("#mandatoryContainer").val() === "1") {
        TT.$("input[title=Mandatory]").val("Yes");
    } else {
        TT.$("input[title=Mandatory]").val("No");

    }
    if (TT.$("#repeatableContainer").val() === "1") {
        TT.$("input[title=Repeatable]").val("Yes");
    } else {
        TT.$("input[title=Repeatable]").val("No");

    }


    if (TT.$("#isActiveContainer").val() === "1") {
        TT.$("input[title=IsActive]").val("Yes");
    } else {

        TT.$("input[title=IsActive]").val("No");
    }
}

ET.TT.PopulateExistingEventForm = function () {
    "use strict";

    var numDays = TT.$("input[title='CompletionTimeSpan']").val();
    var managerName = TT.$("input[title='TrainingManagerName']").val();
    var courseTitle = TT.$("input[title='Title']").val();
    var courseOperationOrder = TT.$("input[title='OperationOrder']").val();
    var repeatable = TT.$("input[title=Repeatable]").val();
    var mandatory = TT.$("input[title=Mandatory]").val();
    var isactive = TT.$("input[title=IsActive]").val();
    var linkToCourseware = TT.$("input[title=LinkToCourseware]").val();
    var courseManagerEmail = TT.$("input[title='TrainingManagerEmail']").val();
    //  //populate form fields
    TT.$("#CurrentEmployeeContainer").html(managerName);
    TT.$("#ETPeoplePicker").val(managerName);
    TT.$("#linkToCoursewareContainer").val(linkToCourseware);

    TT.$("#trainingCourseTitleContainer").val(courseTitle);
    TT.$("#operationOrderContainer").val(courseOperationOrder);
    //populate number of days exists, if not 0

    var courseTimeSpan;
    if (numDays !== null & numDays !== "") {
        courseTimeSpan = TT.$("input[title='CompletionTimeSpan']").val();
        TT.$("#repeatTimeContainer").val(courseTimeSpan);

    } else {
        courseTimeSpan = 0;
        TT.$("#repeatTimeContainer").val(courseTimeSpan);
    }

    if (mandatory === "Yes") {

        TT.$("#mandatoryContainer").val("1");
    }
    else if (mandatory === "No") {

        TT.$("#mandatoryContainer").val("2");
    }
    else {
        TT.$("#mandatoryContainer").val("0");

    }
    if (repeatable === "Yes") {
        TT.$("#repeatableContainer").val("1");
    }
    else if (repeatable === "No") {
        TT.$("#repeatableContainer").val("2");
    }
    else {
        TT.$("#repeatableContainer").val("0");

    }
    if (isactive === "Yes") {
        TT.$("#isActiveContainer").val("1");
    }
    else {
        TT.$("#isActiveContainer").val("2");
    }
}
//end events
//training history manager forms

ET.TT.SaveTrainingHistoryManagerForm = function () {
    "use strict";

    //save peoplepicker value 
    var userName = TT.$("#ETPeoplePicker").text().slice(32, -1); //trim extra "select ..." text
    if (userName !== undefined & userName !== "") {
        TT.$("input[title='UserName']").val(userName);
        TT.$("#CurrentEmployeeContainer").text(userName);
        TT.$("#ErrorCurrentEmployeeContainer").text("");
        var fieldLabelText = TT.$("#ETPeoplePicker_TopSpan").attr("class", "errorInputClear");

    }
    var dateCompleted = TT.$("#DateCompletedContainer").val();
    //  //populate form fields
    //organization fields populated directly from dropdown menus for organizations
    //TitleOfEvent and TrainingEventId populated directly from dropdown list

    TT.$("input[title='DateCompleted']").val(dateCompleted);

    if (TT.$('#isActiveContainer').val() === "1") {
        TT.$("input[title=IsActive]").val("Yes");
    }
    else {
        TT.$("input[title=IsActive]").val("No");
    }

}
ET.TT.PopulateExistingTrainingHistoryManagerForm = function () {
    "use strict";

    var userName = TT.$("input[title='UserName']").val();
    var userEmail = TT.$("input[title='UserEmail']").val();
    //add UserEDIPI when working
    var dateCompleted = TT.$("input[title='DateCompleted']").val();
    var courseTitle = TT.$("input[title='TitleOfEvent']").val();
    var isactive = TT.$("input[title='IsActive']").val();
    //Do not allow editing training event id

    //  //populate form fields
    TT.$("#CurrentEmployeeContainer").html(userName);
    TT.$("#AttendeeEmailContainer").val(userEmail);
    TT.$("#DateCompletedContainer").val(dateCompleted);
    TT.$("#CurrentCourse").text(courseTitle);
    //  get EDIPI working 
    if (isactive === "Yes") {
        TT.$("#isActiveContainer").val("Yes");
    }
    else {
        TT.$("#isActiveContainer").val("No");
    }

}

ET.TT.ButtonToolbarManagerForms = (function () {
    "use strict";
    var load = function () {
        TT.$("#ButtonToolbar").append(TT.$("input[value=Save]:first"));
        TT.$("input[value=Cancel]:first").insertAfter(TT.$("input[value=Save]"));
        // temporary for multiple buttons
        TT.$(".ms-toolbar").hide();

    };
    return {

        load: load
    };
}());
//end training history manager forms
//start certificate
ET.TT.DisplayCertificate = (function () {
    "use strict";
    //creates certificate on-the-fly
    var load = function (eventAttendee, eventCompletion, eventTitle) {
        var webUrl = _spPageContextInfo.webServerRelativeUrl;
        var html = "<html><head><link rel='stylesheet' type='text/css' href='/_layouts/15/1033/styles/Themable/corev15.css'/> <link rel='stylesheet' type='text/css' media='screen,print' href='" + window.location.protocol + "//" + window.location.hostname + webUrl + "/_catalogs/masterpage/ET.TrngTkr/css/Certificate.css'/>  <style media ='print' type='text/css'>#printButton {display:none;}</style></head><Body id='BodyCertificate'><div id='printButton'>To print your certificate, in the browser, select Tools > Print.</div>";
        var htmlBody = "<div class='divCertificate' ><div class='CertificateInner'><p><img src='" + window.location.protocol + "//" + window.location.hostname + webUrl + "/_catalogs/masterpage/ET.TrngTkr/images/army.png'/></p><h1>" + eventAttendee + "</h1><h2>Has completed</h2><h1>" + eventTitle + "</h1><h2>On this date</h2><h1>" + eventCompletion + "</h1></div></div>";
        var htmlClose = "</body></html>";
        var win = window.open("", "Certificate of Completion");
        win.document.open();
        win.document.write(html);
        win.document.write(htmlBody);
        win.document.write(htmlClose);
        win.focus();
    };
    return {

        load: load
    };
}());
//end certificate