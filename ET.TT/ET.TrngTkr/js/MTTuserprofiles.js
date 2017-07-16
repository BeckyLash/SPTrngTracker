var AEP = AEP || {};
AEP.UserProfiles = AEP.UserProfiles || {};
AEP.$ = jQuery.noConflict();
//To do: remove this function if not needed, 
AEP.UserProfiles = (function() {
	"use strict";
	var clientContext = new SP.ClientContext.get_current(),
		web = clientContext.get_web(),
		peopleManager = new SP.UserProfiles.PeopleManager(clientContext);	
	var peoplePicker = function(id, userProperties, userProfileProperties) {
		AEP.$(id).autocomplete({
	        source: search,
	        minLength: 2,
	        select: selectedUser
	    });	
		function search(request, response) {
		    var appweburl = AEP.Utility.getWebRelativeUrl,
		    
		    	restSource = appweburl + "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser",
		    	principalType = 15;
		    AEP.$.ajax({
		        url: restSource,
		        method: "POST",
		        data: JSON.stringify({
		            "queryParams":{
		                "__metadata":{
		                    "type":"SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters"
		                },
		                "AllowEmailAddresses":true,
		                "AllowMultipleEntities":false,
		                "AllUrlZones":false,
		                "MaximumEntitySuggestions":50,
		                "PrincipalSource":15,
		                "PrincipalType": principalType,
		                "QueryString":request.term,
		                //8-26 schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
		                //"Required":false,
		                //"SharePointGroupID":null,
		                //"UrlZone":null,
		                //"UrlZoneSpecified":false,
		                //"Web":null,
		                //"WebApplicationID":null
		            }
		        }),
		        headers:{
		            "accept":"application/json;odata=verbose",
		            "content-type":"application/json;odata=verbose",
		            "X-RequestDigest": AEP.$('#__REQUESTDIGEST').val()
		        },
		        success:function(data) { 
		            var d = data;
		            var results = JSON.parse(data.d.ClientPeoplePickerSearchUser);
		            if (results.length > 0) {
		                response(AEP.$.map(results, function (item) {
		                    // alert(JSON.stringify(item));
		                   // alert(item.Key + item.Email);
		                    return {
		                    	label: item.DisplayText,
		                    	value: item.DisplayText,
		                    	account: item.Description,
		                    	                   
		                    }
		                    
		                }));
		            } 
		        },
		        error:function(err) { 
		            alert(JSON.stringify(err));
		        }
		    }
		  );
		}		
	
	};
	return {
		peoplePicker: peoplePicker		
	};
}());

