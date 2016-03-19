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

	//Load Admob Ad
	loadAd();	

	//Initialize for Google Cloud Messaging
  	initializeGCM();

	//Handle Menu 
	$( "#menu-cntrl" ).click(function() {
		if($("#menu").is(":visible")) {
			$("#menu").hide(200);
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


//Share the app link with user
function share() {
	window.plugins.socialsharing.share('Follow Nifty', 'Nifty Spot Level', null, 'https://play.google.com/store/apps/details?id=com.smart.droid.stock.tip');
	$("#menu").hide(100);
}

//Provide Feedback
function feedback() {
	window.plugin.email.open({
		to:      ['gfservices2013@gmail.com'],
		subject: 'Feedback on Nifty Spot Level',
		body:    '',
		isHtml:  true
	});
	$("#menu").hide(100);
}

//Rate App
function rate() {
	var version = device.platform;
	if(version == "Android") {
		var url = "market://details?id=com.smart.droid.stock.tip";
        window.open(url,"_system");			
	} else {
	}
	$("#menu").hide(100);
}


//Funciton to initalize admob add
function loadAd() {

	//var div = document.createElement("div");
	//document.appendChild(div);
	var div = document.getElementById("smaatoad");   
	var simpleAd = new Smaato(div, {
	    publisherId: ad_units.publisherId,
	    adId: ad_units.android.banner,
		adSize: SMAATO_AD_SIZE.BANNER,
		autoShow: true	    
	});

	// it will display leaderboard banner at bottom center, using the default options 
	//var div = document.createElement("div");
	//document.appendChild(div);

	/*
	var adDiv = document.getElementById("ad-holder");
	var simpleAd = new Smaato(adDiv, {
	    publisherId: ad_units.publisherId,
	    adId: adid.small_banner,
	    position:SMAATO_AD_POSITION.BOTTOM_CENTER,
	    autoShow: true, 
	    autoReload: true, 
	    isTesting: true,
	    x: 0
	});
	*/

}

function onReceiveFail (message) {
	var msg=admob.Error[message.data];
    if(msg==undefined) {
    	msg=message.data;
	}
	console.log("Admob Failure : " + msg);
}

function onReceiveSuccess(message){
	//var msg=message.type+"\n";
	//console.log("Admob Success : " + msg);
	//admob.showInterstitial();
}

//Load AdMob Interstitial Ad
function showInterstitial(){
    admob.isInterstitialReady(function(isReady){
        if(isReady){
            admob.showInterstitial();
        }
    });
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
  console.log("GCM Successfully Registered. Token: " + result.gcm);
}

//Failure Handler for GCM Resgistration
function errorHandlerGCM(error) {
  console.log("GCM Registration Error: " + error);
}

//GCM Notification Recieved
function onNotification(extra) {
  //console.log("Event Received: " + extra);  
  if(extra) {
	var data = JSON.parse(extra);		  	
	if(data.type) {
		var landingPath = "#/notify/" + data.type;
		window.location = landingPath;
	}
  }
}
