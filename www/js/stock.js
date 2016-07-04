var testDevice = '9ff99ad5ec042ed6';
var interDisplayed = false;
var analyticsId = 'UA-45773318-14';
var GCMSenderId = '307566433338';

// select the right Ad Id according to platform 
var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos 
  platform = 'Android';
  admobid = {
    banner: 'ca-app-pub-4470137303258727/3857043299', 
    interstitial: 'ca-app-pub-4470137303258727/5333776499'
  };
}
 
//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {

	window.analytics.startTrackerWithId(analyticsId);

  // Manage Ad
  initializeAd();

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


/* Ad initialization & display */
function initializeAd() {
  createBanner();
  prepareInter();
}

function createBanner() {
  var testFlag = isTestDevice();

  if(AdMob) AdMob.createBanner( {
    adId: admobid.banner, 
    position: AdMob.AD_POSITION.BOTTOM_CENTER, 
    autoShow: true, 
    isTesting: testFlag  
  } );
}

function prepareInter() {
  var testFlag = isTestDevice();
  if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false, isTesting: testFlag} );
}

function isTestDevice() {
    var flgTestDevice = false;
    var deviceUUID = device.uuid;
    if(deviceUUID == testDevice) {
      //console.log("Test Device : " + device.uuid);
      flgTestDevice = true;
    }
    return flgTestDevice;
}

//Load AdMob Interstitial Ad
function showInterstitial() {
  if(interDisplayed > 2) {
    if(AdMob) {
      AdMob.showInterstitial();
      interDisplayed = 0;
    } 
  } else {
    interDisplayed = interDisplayed + 1;
    //console.log("Interstitial Displayed : " + interDisplayed);
  }    
}


function onInterstitialReceive (message) {
    //alert(message.type + " ,you can show it now");
    //admob.showInterstitial();//show it when received
    //setTimeout(showInterstitial, 10 * 1000);
}

function onReceiveFail (message) {
  var msg=admob.Error[message.data];
    if(msg==undefined){
       msg=message.data;
    }
    //console.log("load fail: " + message.type + "  " + msg);
} 
