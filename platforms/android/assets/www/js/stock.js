var analyticsId = 'UA-45773318-14';
var GCMSenderId = '307566433338';

var ad_units = {
	publisherId: "1100006441",    
    iosadid: "",
    iosadtracking: true,
    googleadid: "",
    googlednt: false,
    android: {
        banner: '130073437',       // Phones and Tablets 120 x 20 
        interstitial: '130073438'     // Phones and Tablets 100% 
    }
};
 
//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {

	window.analytics.startTrackerWithId(analyticsId);

	//Initialize for Google Cloud Messaging
  initializeGCM();

	//Load Admob Ad
	//loadAd();	

	//Handle Menu 
	$( "#menu-cntrl" ).click(function() {
		if($("#menu").is(":visible")) {
			$("#menu").hide();
		} else {
			$("#menu").show(400);
		}
	});
	
	//CLear cache
    var success = function(status) {
        //alert('Message: ' + status);
    }

    var error = function(status) {
        //alert('Error: ' + status);
    }

    window.cache.clear( success, error );
    window.cache.cleartemp(); // 

}

//Hiding Menu
function hideMenu() {
	$("#menu").hide(200);
}

//Exit Implementation
document.addEventListener("backbutton", function() {
	if ( $('.ui-page-active').attr('id') == 'main') {
		exitAppPopup();
	} else {
		history.back();             
	}
}, false);

function exitAppPopup() {
    navigator.notification.confirm(
          'Exit Nifty Spot Level'
        , function(button) {
              if (button == 2) {
                  navigator.app.exitApp();
              } 
          }
        , 'Exit'
        , 'No,Yes'
    );  
    return false;
}


//Funciton to initalize admob add
function loadAd() {
	//prepareInterstitial();
}

//Loading Intersitial Ad 
function prepareInterstitial() {
	SomaJS.loadAd({
	    adDivId : "smaatoadint",
	    publisherId: ad_units.publisherId,
	    adSpaceId: ad_units.android.interstitial,
		format: "vast",
		formatstrict: true,
	    dimension: "full_320x480"
	  },callBackForSmaatoInter);
}

function callBackForSmaatoInter(status) {
	console.log("Smaato Inter Callback : " + status);
}

//Initialize Google Clould Messaging
function initializeGCM() {
  
  window.GCMPush.register(successHandlerGCM, errorHandlerGCM, {
  	  "senderId" : GCMSenderId,
      "jsCallback" : "onNotification"
  });

}

//Success Handler for GCM Resgistration
function successHandlerGCM(result) {
  //console.log("GCM Successfully Registered. Token: " + result.gcm);
}

//Failure Handler for GCM Resgistration
function errorHandlerGCM(error) {
  console.log("GCM Registration Error: " + error);
}

//GCM Notification Recieved
function onNotification(extra) {
  console.log("Event Received: " + extra);  
  if(extra) {
	var landingPath = "#/notify/" + extra;
	window.location = landingPath;
  }
}
