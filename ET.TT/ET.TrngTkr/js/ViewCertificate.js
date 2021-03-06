var ET = ET || {};
ET.TT = ET.TT || {};
 
TT.$ = jQuery.noConflict();
//runs from native display item form
TT.$(document).ready(function () {
    "use strict";
    var eventName = TT.$("h3:contains('TitleOfEvent')").closest("td").next("td").text();
    var completionDate = TT.$("h3:contains('DateCompleted')").closest("td").next("td").text();
    var userName = TT.$("h3:contains('UserName')").closest("td").next("td").text();
    var trimDate = completionDate.replace(/[\n\t]/g,"");
    var certDate = new Date(trimDate.slice(0,-9));
    var dd = certDate.getDate();
    var mm = certDate.getMonth() + 1; 
    var yyyy = certDate.getFullYear();
    var dateCertificate = mm + "/" + dd + "/" + yyyy;
    TT.$("#AttendeeContainer").text(userName);
    TT.$("#EventCompletionContainer").text(dateCertificate);
    TT.$("#EventTitleContainer").text(eventName);
    //TT.$("input[value=Close]:first").insertBefore(TT.$("#printButton"));
  //  TT.$("input[value=Close]:first").attr("class","noPrint");//still prints


});

