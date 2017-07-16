var AEP = AEP || {};
AEP.UserProfiles = AEP.UserProfiles || {};
AEP.$ = jQuery.noConflict();
AEP.UserProfiles = (function() {
	"use strict";
	var clientContext = new SP.ClientContext.get_current(),
		web = clientContext.get_web(),
		peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
	/*functions*/
	var peoplePicker = function(id, userProperties, userProfileProperties) {
		AEP.$(id).autocomplete({
	        source: search,
	        minLength: 2,
	        select: selectedUser
	    });	
		function search(request, response) {
		    var appweburl = AEP.Utility.getWebRelativeUrl,
		    	hostweburl = AEP.Utility.getSiteRelativeUrl,
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
		            console.log(JSON.stringify(err)); 
		        }
		    }
		  );
		}
		function selectedUser(event, ui) {
			getUserProperties(ui.item.account, userProperties);
			getUserProfileProperties(ui.item.account, userProfileProperties);
		}
	},
	/*getUserProperties = function(account, properties) {
		var query = AEP.Utility.getRestListUrl() + "_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" + account + "'";
		AEP.$.ajax({
			url: query,
			type: "GET",
			headers: { "Accept": "application/json;odata=verbose" },
			success: function(data) {
				var userProperties = {
					DisplayName: data.d.DisplayName,
					Email: data.d.Email,
					PersonalUrl: data.d.PersonalUrl,
					PictureUrl: data.d.PictureUrl,
					Title: data.d.Title
				
				};
				for (var i = 0; i < properties.length; i++) {
					AEP.$(id + "-" + properties[i]).html(userProperties[properties[i]]);
				}
			},
			error: function(err) {
				AEP.Utility.Error.setFailure(err);
			}
		});
	},*/
   
	getUserProperties = function (id, account, properties) {
	    //alert("properties:  " + properties);
		var userProperties = peopleManager.getPropertiesFor(account);
		clientContext.load(userProperties);
		clientContext.executeQueryAsync(success, fail);
		function success() {
		    if (properties !== "null" & properties !== undefined) {
		        for (var i = 0; i < properties.length; i++) {
		            switch (properties[i]) {
		                case "AccountName":
		                    property = userProperties.get_accountName();//
		                    break;
		                case "DisplayName":
		                    property = userProperties.get_displayName();
		                    break;
		                case "Email":
		                    property = userProperties.get_email();
		                    //8-26

		                    break;
		                case "Key":
		                    property = userProperties.get_loginName();
		                    break;
		            }
		            
		            return property;
		        }
		    }
		}
		function fail(err) { 
			console.log("getUserProperties failed. Error: " + err);
		}
	
	},
	getUserProfileProperties = function(id, account, properties) {
		var userProfilePropertiesForUser = new SP.UserProfiles.UserProfilePropertiesForUser(clientContext, account, properties),
			userProfileProperties = null;
		userProfileProperties = peopleManager.getUserProfilePropertiesFor(userProfilePropertiesForUser);
		clientContext.load(userProfilePropertiesForUser);
		clientContext.executeQueryAsync(success, fail);
		function success() {
			//for (var i = 0; i < properties.length; i++) {
			   // AEP.$(id + "-" + properties[i]).html(userProfileProperties[i]);
			    
			//}
		}
		function fail(err) { 
			console.log("getUserProfileProperties failed. Error: " + err);
		}
	};
	return {
		peoplePicker: peoplePicker,
		getUserProperties: getUserProperties,
		getUserProfileProperties: getUserProfileProperties
	};
}());

