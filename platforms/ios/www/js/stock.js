// load I18N bundles
//document.addEventListener("deviceready", function(){
	//loadBundles('tn');
//});

$(document).ready(function() {
	loadBundles('tn');
});

function loadBundles(lang) {
	jQuery.i18n.properties({
		name:'Messages', 
		path:'bundle/', 
		mode:'both',
		language:lang, 
		callback: function() {
			updateLanguage();
		}
	});
}

function updateLanguage() {
	$(".i18n").each(function(i, element){
		if(element.tagName == "input")
			$(element).val(jQuery.i18n.prop(element.id));
		else
			$(element).html(jQuery.i18n.prop(element.id));
	});		
}

//Share the app link with user
function share() {
	window.plugins.socialsharing.share('Try this great Tamil App - ', '1500+ Tamil Tips',null,'https://play.google.com/store/apps/details?id=com.smart.droid.tamil.tips');
}

//Provide Feedback
function feedback() {
	window.plugin.email.open({
		to:      ['tips2stayhealthy@gmail.com'],
		subject: 'Feedback on V0.0.2',
		body:    '',
		isHtml:  true
	});
}

//Rate App
function rate() {
	var version = device.platform;
	if(version == "Android") {
		var url = "https://play.google.com/store/apps/details?id=com.smart.droid.tamil.tips"
	} else {
		//FIXME - Change this accordingly
		var url = "https://play.google.com/store/apps/details?id=com.smart.droid.tamil.tips"
	}
	window.open( url, "_blank" );
}


/*
//Load AdMob Interstitial Ad
function showInterstitial(){
	admobAd.isInterstitialReady(function(isReady){
		if(isReady){
			admobAd.showInterstitial();
		}
	});
}
function onInterstitialReceive (message) {
	//alert("onMInterstitialReceive ,you can show it now");
	console.log('onMInterstitialReceive ,you can show it now');
}
function onReceiveFail (message) {
   //alert("load fail: "+message.type+"  "+message.data);
   console.log("load fail: " + message.type + "  " + message.data);
}

function onAdmobEvent (message) {
	console.log("Message Received - " + message);
}

function onDeviceReady() {
	admobAd.initInterstitial("ca-app-pub-5575552359884924/4141809090");
	console.log("init Interstitial Triggered");
	document.addEventListener('onAdmobInterstitialDismiss', onAdmobEvent, false);
	document.addEventListener('onAdmobInterstitialFailedReceive', onAdmobEvent, false);
	document.addEventListener('onAdmobInterstitialLeaveApplication', onAdmobEvent, false);
	document.addEventListener('onAdmobInterstitialPresent', onAdmobEvent, false);
	document.addEventListener('onAdmobInterstitialReceive', onAdmobEvent, false);
	//document.addEventListener(admobAd.AdEvent.onInterstitialReceive, onInterstitialReceive, false);
	//document.addEventListener(admobAd.AdEvent.onInterstitialFailedReceive,onReceiveFail, false);
	
	admobAd.initBanner("ca-app-pub-5575552359884924/4721415096", admobAd.AD_SIZE.BANNER.width, admobAd.AD_SIZE.BANNER.height);
	console.log('Init Banner Triggered');
	admobAd.showBanner(admobAd.AD_POSITION.BOTTOM_CENTER);
}
*/

//document.addEventListener('deviceready',onDeviceReady, false);
