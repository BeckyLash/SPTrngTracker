var ET = ET || {};
ET.TT = ET.TT || {};
 
TT.$ = jQuery.noConflict();
ET.TT.LandingPage = (function () {
    "use strict";
    var changeDisplay = function (role) {
        TT.$("#mtt-Content").children("div").hide();
        if (!role) {
            TT.$("#mtt-MenuButtons").children("a").attr("class", "normal");
            TT.$("#gettingStarted").show();
        } else {
            TT.$("#mtt-MenuButtons").children("a").attr("class", "inactive");
            TT.$("#" + role + "Button").attr("class", "active");
            TT.$("#" + role + "Div").show();
        }
    },
	editMode = function () {
	    alert('in edit mode');
	    //TT.$("#mtt-MenuButtons").children("a").attr("class", "inactive");
	    //TT.$("#mtt-Content").children("div").attr("style", "display:block");
	},
	getUrlValue = function (v) {
	    var str = window.location.search.substring(1),
	    	arr = str.split("?");
	    for (var i = 0; i < arr.length; i++) {
	        var keyVal = arr[i].split("=");
	        if (keyVal[0] === v) {
	            return keyVal[1];
	        }
	    }
	},
	load = function () {
	    var role = getUrlValue("role");
	    changeDisplay(role);
	    TT.$("#mtt-MenuButtons").children("a").click(function () {
	        var role = TT.$(this).attr("href");
	        ET.TT.SubMenu.updateURL(role);//update URL and then trim
	        role = role.split("?role=");
	        role = role[1];
	        changeDisplay(role);
	        ET.TT.SubMenu.displayContent();//display last item in area
	        return false;
	    });
	};
    return {
        getUrlValue: getUrlValue,
        load: load
    };
}());


ET.TT.SubMenu = (function () {
    "use strict";
    var getWebParts = function (array, webPartsParent) {
       
        //alert("parent:" + JSON.stringify(webPartsParent));
        //get all web part items in the div
        if (webPartsParent !== "#gettingStarted") {
            var webPartsContainer = TT.$(webPartsParent);
            var elements = TT.$(webPartsContainer.find("[id^=MSOZoneCell]"));
            TT.$(elements)
                .each(function () {
                    var itemId = TT.$(this).attr("id");
                    array.push(itemId);
                });
        }
        return array;
    },
     //dependent on order and one web part per area to show/hide
        //- place web parts on page in same order as a elements
    changeDisplaySubmenu = function (array, element) {
        var parentDiv = TT.$("#" + element.substring(0, 6));
        TT.$("#gettingStarted").hide();

        if (TT.$(parentDiv).css("display") === "block") {
            array.forEach(function (item, index) {
                if (element === TT.$(parentDiv).attr("id") + "Link" + index) {
                    TT.$("#" + item).show();

                } else {
                    TT.$("#" + item).hide();
                }
            });
        }
    },
    displayContent = function () {
        var array = [];
        //filter to prevent getting back more than one element when click top images 
        var parentDiv = TT.$("#mtt-Content").children("div").filter(function () {
            return TT.$(this).css("display") === "block";
        });
        var parentDivId = "#" + TT.$(parentDiv).attr("id");
        TT.$("#gettingStarted").hide();
        //force showing last item in array on first click - 
        //dependent on order in array and on page
        getWebParts(array, parentDivId);
        var lastElement = array[array.length - 1];
        array.forEach(function (item) {
            if (item === lastElement) {
                TT.$("#" + item).show();
            } else {
                TT.$("#" + item).hide();
            }
        });
    },
   updateURL = function (href) {

       if (history.pushState) {
           //var sourceString = href;
           //alert(href);
          // sourceString.replace("&", "%26");
           //var newUrl = href + "&source=" + sourceString;
           var newUrl = href ;
           window.history.pushState({ path: newUrl }, "", newUrl);
           //sourceString = "";
           //href = "";
           //newUrl = "";
       }

   },
     bindElements = function () {//dependent on one web part per area - use with changeDisplaySubmenu
         TT.$("td.sub-menu").find("a[id*='DivLink']").click(function () {
             var array = [], webPartsContainer = TT.$("#" + this.id).parent().prev(".webparts");
             getWebParts(array, webPartsContainer);
             if (typeof array[0] !== "undefined") {
                 changeDisplaySubmenu(array, this.id);
             }
             return false;
         });

     };
    return {
        updateURL: updateURL,
        getWebParts: getWebParts,
        displayContent: displayContent,
        bindElements: bindElements
    };
}());
//use if different number of web parts per area
ET.TT.ShowSpecificWebParts = (function () {
    "use strict";
    var displayEmployeeTools = function (array, div, element) {
        switch (element) {
            //each image has a case
            case ("userguide"):
            case (TT.$(div).attr("id") + "Link" + 0):
                TT.$("#" + array[0]).show();
                TT.$("#" + array[1]).hide();
                TT.$("#" + array[2]).hide();
                break;
            case ("printcert"):
            case (TT.$(div).attr("id") + "Link" + 1):
                TT.$("#" + array[0]).hide();
                TT.$("#" + array[1]).show();
                TT.$("#" + array[2]).hide();
                break;
            case ("trainhist"):
            case (TT.$(div).attr("id") + "Link" + 2):
                TT.$("#" + array[0]).hide();
                TT.$("#" + array[1]).hide();
                TT.$("#" + array[2]).show();
                break;
            default:
                break;
        }
    },
    displayTrainingManagerTools = function (array, div, element) {
        switch (element) {
            case ("userguide"):
            case (TT.$(div).attr("id") + "Link" + 0):
                TT.$("#" + array[0]).show();
                TT.$("#" + array[1]).hide();
                TT.$("#" + array[2]).hide();
                TT.$("#" + array[3]).hide();

                break;
            case ("events"):
            case (TT.$(div).attr("id") + "Link" + 1):
                TT.$("#" + array[0]).hide();
                TT.$("#" + array[1]).show();
                TT.$("#" + array[2]).hide();
                TT.$("#" + array[3]).hide();

                break;
            case ("enteratt"):
            case (TT.$(div).attr("id") + "Link" + 2):
                TT.$("#" + array[0]).hide();
                TT.$("#" + array[1]).hide();
                TT.$("#" + array[2]).show();
                TT.$("#" + array[3]).show();
                break;
            default:
                break;
        }
    },
    displayReportManagerTools = function (array, div, element) {
        switch (element) {
            case ("userguide"):
            case (TT.$(div).attr("id") + "Link" + 0):
                TT.$("#" + array[0]).show();
                TT.$("#" + array[1]).hide();
                break;
            case ("reports"):
            case (TT.$(div).attr("id") + "Link" + 1):
                TT.$("#" + array[0]).hide();
                TT.$("#" + array[1]).show();
                break;
            default:
                break;
        }
    },
    displayAdministratorTools = function (array, div, element) {
        switch (element) {
            case ("userguide"):
            case (TT.$(div).attr("id") + "Link" + 0):
                TT.$("#" + array[0]).show();
                TT.$("#" + array[1]).hide();
                TT.$("#" + array[2]).hide();
                TT.$("#" + array[3]).hide();
                TT.$("#" + array[4]).hide();
                TT.$("#" + array[5]).hide();
                TT.$("#" + array[6]).hide();
                TT.$("#" + array[7]).hide();

                break;
            case ("org"):
            case (TT.$(div).attr("id") + "Link" + 1):
                TT.$("#" + array[0]).hide();
                TT.$("#" + array[1]).show();
                TT.$("#" + array[2]).show();
                TT.$("#" + array[3]).show();
                TT.$("#" + array[4]).show();
                TT.$("#" + array[5]).show();
                TT.$("#" + array[6]).hide();
                TT.$("#" + array[7]).hide();

                break;
            case ("reports"):
            case (TT.$(div).attr("id") + "Link" + 2):
                TT.$("#" + array[0]).hide();
                TT.$("#" + array[1]).hide();
                TT.$("#" + array[2]).hide();
                TT.$("#" + array[3]).hide();
                TT.$("#" + array[4]).hide();
                TT.$("#" + array[5]).hide();
                TT.$("#" + array[6]).show();
                TT.$("#" + array[7]).hide();

                break;
            case ("events"):
            case (TT.$(div).attr("id") + "Link" + 3):
                TT.$("#" + array[0]).hide();
                TT.$("#" + array[1]).hide();
                TT.$("#" + array[2]).hide();
                TT.$("#" + array[3]).hide();
                TT.$("#" + array[4]).hide();
                TT.$("#" + array[5]).hide();
                TT.$("#" + array[6]).hide();
                TT.$("#" + array[7]).show();

                break;
            default:
                break;
        }
    },
    changeSubmenuWebParts = function (empRole, array, element) {
        var parentDiv = TT.$("#" + element.substring(0, 6));
        TT.$("#gettingStarted").hide();
        //dependent on order - place web parts on page in same order as a link elements
        if (TT.$(parentDiv).css("display") === "block") {
            switch (empRole) {
                case ("emp"):
                    displayEmployeeTools(array, parentDiv, element);
                    break;
                case ("tmg"):
                    displayTrainingManagerTools(array, parentDiv, element);
                    break;
                case ("rmg"):
                    displayReportManagerTools(array, parentDiv, element);
                    break;
                case ("adm"):
                    displayAdministratorTools(array, parentDiv, element);
                    break;
                default:
                    break;
            }
        }
    },
    queryStringUrl = function (field, url) {
        var href = url ? url : window.location.href;//url optional
        var reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
        var string = reg.exec(href);
        return string ? string[1] : null;
    },
    displaySectionOnLoad = function () {

        var webAddress = window.location.href;
        var stringRole = queryStringUrl("role", webAddress);
        var stringArea = queryStringUrl("area", webAddress);
        if (typeof stringRole !== "undefined" && stringRole !== null) {
            var role = stringRole;
            var area = stringArea;
            var div = role + "Div";
            var array = [], webPartsContainer = "#" + div;
            TT.$("#" + role + "Button").attr("class", "active");
            TT.$("#" + div).css("display", "block");


            ET.TT.SubMenu.getWebParts(array, webPartsContainer);
            if (typeof array[0] !== "undefined") {
                switch (role) {
                    case ("emp"):
                        displayEmployeeTools(array, div, area);
                        break;
                    case ("tmg"):
                        displayTrainingManagerTools(array, div, area);
                        break;
                    case ("rmg"):
                        displayReportManagerTools(array, div, area);
                        break;
                    case ("adm"):
                        displayAdministratorTools(array, div, area);
                        break;
                    default:
                        break;
                }

            }
        }
    },
     bindSubmenu = function () {
         TT.$("td.sub-menu").find("a[id*='DivLink']").click(function () {
             var role = TT.$(this).attr("href");//new
             ET.TT.SubMenu.updateURL(role);
             var array = [], webPartsContainer = TT.$("#" + this.id).parent().prev(".webparts");
             ET.TT.SubMenu.getWebParts(array, webPartsContainer);
             if (typeof array[0] !== "undefined") {
                 //go get role and pass in
                 var role = TT.$(this).attr("href");
                 role = role.substring(6, 9);
                 changeSubmenuWebParts(role, array, this.id);
             }
             return false;
         });
     };
    return {
        bindSubmenu: bindSubmenu,
        displaySectionOnLoad: displaySectionOnLoad
    };
}());

//TT.$(document).ready(function () {
//    "use strict";

   ET.TT.LandingPage.load();
   ET.TT.ShowSpecificWebParts.bindSubmenu();
   ET.TT.ShowSpecificWebParts.displaySectionOnLoad();
//});
