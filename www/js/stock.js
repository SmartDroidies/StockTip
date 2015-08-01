//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {
	//Sync Spot 
	SyncSpot();
	//Sync Alert 
	SyncAlert();
	//Sync Tip 
	SyncTip();
	
	//Load Admob Ad
	loadAd();	


	//Handle Menu 
	$( "#menu-cntrl" ).click(function() {
		if($("#menu").is(":visible")) {
			$("#menu").hide(200);
		} else {
			$("#menu").show(400);
		}
	});
	
	//Close menu if user clicks somewhere else
	/*
	$("body").click( function(e) {
		if(e.target.className !== "menu") {
			$("#menu").hide();
		}
	});
	*/
}

//Hiding Menu
function hideMenu() {
	$("#menu").hide(200);
}

var intialSpotURL = "https://nodejs-smartdroidies.rhcloud.com/stock/spot";
var intialTipURL = "https://nodejs-smartdroidies.rhcloud.com/stock/tip";
var intialAlertURL = "https://nodejs-smartdroidies.rhcloud.com/stock/alert";
var prefix = "lsnsl.";
var sync_time_spot = prefix + 'sync_time_spot';
var sync_time_tip = prefix + 'sync_time_tip';
var sync_time_alert = prefix + 'sync_time_alert';
var nifty_spot = prefix + 'nifty_spot';
var nifty_tip = prefix + 'nifty_tip';
var nifty_alert = prefix + 'nifty_alert';

//Load or Sync Nifty Spot Data
function SyncSpot() {
	var lastSyncSpot = window.localStorage.getItem(sync_time_spot);
	if (lastSyncSpot) {
		//console.log('Sync Latest Nifty Spot - Start ');
		syncLatestNiftySpot();
		//console.log('Sync Latest Nifty Spot - End ');
	} else {
		//console.log('Load Initial Nifty Spot - Start ');
		loadInitialNiftySpot();
		//console.log('Load Initial Nifty Spot - End ');
	}
}

//Load or Sync Alert Data
function SyncAlert() {
	var lastSyncAlert = window.localStorage.getItem(sync_time_alert);
	if (lastSyncAlert) {
		//console.log('Sync Latest Nifty Alert - Start ');
		syncLatestNiftyAlert();
		//console.log('Sync Latest Nifty Alert - End ');
	} else {
		//console.log('Load Initial Nifty Alert - Start ');
		loadInitialNiftyAlert();
		//console.log('Load Initial Nifty Alert - End ');
	}
}

//Load or Sync Tip Data
function SyncTip() {
	var lastSyncTip = window.localStorage.getItem(sync_time_tip);
	if (lastSyncTip) {
		//console.log('Sync Latest Nifty Tip - Start ');
		syncLatestNiftyTip();
		//console.log('Sync Latest Nifty Tip - End ');
	} else {
		//console.log('Load Initial Nifty Tip - Start ');
		loadInitialNiftyTip();
		//console.log('Load Initial Nifty Tip - End ');
	}
}


// Load Nifty Spot for the First Time 
function loadInitialNiftySpot() {
	jQuery.getJSON(intialSpotURL, function (data) {
		console.log( "Loading Initial Spot..");
	}).done(function(data) {
		window.localStorage.setItem(nifty_spot, JSON.stringify(data.data));
		window.localStorage.setItem(sync_time_spot, data.ts);
		console.log( "Initial Nifty Spot Successfully Loaded" );
	}).fail(function() {
		console.log( "Failed to load initial Nifty Spot" );
	})
}

// Sync Nifty Spot 
function syncLatestNiftySpot() {
	var fileTransfer = new FileTransfer();
	var uri = encodeURI(intialSpotURL);
	var lastSyncTime = window.localStorage.getItem(sync_time_spot);
	if(lastSyncTime) {
		uri = encodeURI("https://nodejs-smartdroidies.rhcloud.com/stock/spot?ts=" + lastSyncTime);
	} 
	var fileURL = cordova.file.cacheDirectory + "/spot.json";
	//console.log("Download URL : " + uri);
	fileTransfer.download(uri, fileURL, function (entry) {
		//console.log("download complete: " + entry.toURL());
		syncLocalSpot(fileURL);
	}, function (error) {
		console.log("download error source " + error.source);
		console.log("download error target " + error.target);
		console.log("Download Error : " + error.code + " - " + error.exception);
		console.log("http_status " + error.http_status);
	},false);
}


//Sync Temp JSON for Nitfy Spot
function syncLocalSpot(file) {
	//console.log("Temp JSON URL : " + file);
	jQuery.getJSON(file, function (data) {
		if (!angular.isUndefined(data)) {
			var localSpot =  window.localStorage.getItem(nifty_spot);
			var localJSON = JSON.parse(localSpot);
			$.each(data.data, function(key, item) {
				//console.log(key + " - " + JSON.stringify(item));
				var newSpot = true;
				_.find(localJSON,function(rw, rwIdx) { 
					if(rw._id == item._id) {
						localJSON[rwIdx] = item;
						console.log("Replace Existing Object for : " + key); 
						newSpot = false; 
						return true;
					}; 
				});
				//If new tip
				if(newSpot) {
					//console.log("New Object for : " + key + " - " + JSON.stringify(item));
					//console.log("Array Size : " + _.size(localJSON));
					localJSON.push(item);
					//console.log("Modified Array Size : " + _.size(localJSON));
				}
			});
			window.localStorage.setItem(nifty_spot, JSON.stringify(localJSON));
			var modifiedTime = data.ts;
			if(typeof modifiedTime != 'undefined') {
				window.localStorage.setItem(sync_time_spot, data.ts);
			}
			
		}	
	}).fail(function () {
		console.log("Failed to sync latest Nifty Spot");
	});
}


// Load Nifty Spot for the First Time 
function loadInitialNiftyAlert() {
	jQuery.getJSON(intialAlertURL, function (data) {
		console.log( "Loading Initial Alert..");
	}).done(function(data) {
		window.localStorage.setItem(nifty_alert, JSON.stringify(data.data));
		window.localStorage.setItem(sync_time_alert, data.ts);
		console.log( "Initial Nifty Alert Successfully Loaded" );
	}).fail(function() {
		console.log( "Failed to load initial Nifty Alert" );
	})
}


// Sync Nifty Alert 
function syncLatestNiftyAlert() {
	var fileTransfer = new FileTransfer();
	var uri = encodeURI(intialAlertURL);
	var lastSyncAlert = window.localStorage.getItem(sync_time_alert);
	if(lastSyncAlert) {
		uri = encodeURI(intialAlertURL + "?ts=" + lastSyncAlert);
	} 
	var fileAlertURL = cordova.file.cacheDirectory + "/alert.json";
	//console.log("Download URL : " + uri);
	fileTransfer.download(uri, fileAlertURL, function (entry) {
		//console.log("download complete: " + entry.toURL());
		syncLocalAlert(fileAlertURL);
	}, function (error) {
		console.log("download error source " + error.source);
		console.log("download error target " + error.target);
		console.log("Download Error : " + error.code + " - " + error.exception);
		console.log("http_status " + error.http_status);
	},false);
}

//Sync Temp JSON for Nifty Alert
function syncLocalAlert(file) {
	//console.log("Temp JSON URL : " + file);
	jQuery.getJSON(file, function (data) {
		if (!angular.isUndefined(data)) {
			var localAlert =  window.localStorage.getItem(nifty_alert);
			var localJSONAlert = JSON.parse(localAlert);
			$.each(data.data, function(key, item) {
				//console.log(key + " - " + JSON.stringify(item));
				var newAlert = true;
				_.find(localJSONAlert,function(rw, rwIdx) { 
					if(rw._id == item._id) {
						localJSONAlert[rwIdx] = item;
						console.log("Replace Existing Object for : " + key); 
						newAlert = false; 
						return true;
					}; 
				});
				//If New Alert
				if(newAlert) {
					//console.log("New Object for : " + key + " - " + JSON.stringify(alert));
					//console.log("Array Size : " + _.size(localJSONAlert));
					localJSONAlert.push(item);
					//console.log("Modified Array Size : " + _.size(localJSONAlert));
				} 
			});
			window.localStorage.setItem(nifty_alert, JSON.stringify(localJSONAlert));
			var modifiedTime = data.time;
			if(typeof modifiedTime != 'undefined') {
				window.localStorage.setItem(sync_time_alert, data.time);
			}
		}	
	}).fail(function () {
		console.log("Failed to sync latest Nifty Alert");
	});
}

// Load Nifty Tip for the First Time 
function loadInitialNiftyTip() {
	jQuery.getJSON(intialTipURL, function (data) {
		console.log( "Loading Initial Tip..");
	}).done(function(data) {
		window.localStorage.setItem(nifty_tip, JSON.stringify(data.data));
		window.localStorage.setItem(sync_time_tip, data.ts);
		console.log( "Initial Nifty Tip Successfully Loaded" );
	}).fail(function() {
		console.log( "Failed to load initial Nifty Tip" );
	})
}

// Sync Nifty Tip
function syncLatestNiftyTip() {
	var fileTransfer = new FileTransfer();
	var uri = encodeURI(intialTipURL);
	var lastSyncTime = window.localStorage.getItem(sync_time_tip);
	if(lastSyncTime) {
		uri = encodeURI(intialTipURL + "?ts=" + lastSyncTime);
	} 
	var fileURL = cordova.file.cacheDirectory + "/tip.json";
	//console.log("Download URL : " + uri);
	fileTransfer.download(uri, fileURL, function (entry) {
		//console.log("download complete: " + entry.toURL());
		syncLocalTip(fileURL);
	}, function (error) {
		console.log("download error source " + error.source);
		console.log("download error target " + error.target);
		console.log("Download Error : " + error.code + " - " + error.exception);
		console.log("http_status " + error.http_status);
	},false);
}


//Sync Temp JSON for Nitfy Tip
function syncLocalTip(file) {
	//console.log("Temp JSON URL : " + file);
	jQuery.getJSON(file, function (data) {
		if (!angular.isUndefined(data)) {
			var localTip =  window.localStorage.getItem(nifty_tip);
			var localJSON = JSON.parse(localTip);
			$.each(data.data, function(key, item) {
				//console.log(key + " - " + JSON.stringify(item));
				var newTip = true;
				_.find(localJSON,function(rw, rwIdx) { 
					if(rw._id == item._id) {
						localJSON[rwIdx] = item;
						console.log("Replace Existing Object for : " + key); 
						newTip = false; 
						return true;
					}; 
				});
				//If new tip
				if(newTip) {
					console.log("New Object for : " + key + " - " + JSON.stringify(item));
					localJSON.push(item);
				}
			});
			window.localStorage.setItem(nifty_tip, JSON.stringify(localJSON));
			var modifiedTime = data.ts;
			if(typeof modifiedTime != 'undefined') {
				window.localStorage.setItem(sync_time_tip, data.ts);
			}
			
		}	
	}).fail(function () {
		console.log("Failed to sync latest Nifty Tip");
	});
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
	admob.initAdmob("ca-app-pub-7211761341170914/5295352787","ca-app-pub-7211761341170914/8572492788");
	admob.showBanner(admob.BannerSize.BANNER,admob.Position.BOTTOM_APP); 
	//admob.showBannerAbsolute(admob.BannerSize.BANNER,20,100);

	document.addEventListener(admob.Event.onInterstitialFailedReceive,onReceiveFail, false);
	document.addEventListener(admob.Event.onBannerFailedReceive,onReceiveFail, false);
	document.addEventListener(admob.Event.onInterstitialReceive,onReceiveSuccess, false);

	admob.cacheInterstitial();// load admob Interstitial

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

