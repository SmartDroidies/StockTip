'use strict';

/* Controllers */

var stockControllers = angular.module('stockControllers', []);

stockControllers.controller('HomeCtrl', ['$scope', 'DataService', '$location', '$routeParams',
  function($scope, dataService, $location, $routeParams) {
	//Show Home Page
	$scope.showHome = function () {    
		hideMenu();

		var typ = $routeParams.type;
		if(typ) {
			//console.log("Type : " + typ);
			if(typ == 'Alert') {
				$scope.stockAlert();
			} else if (typ == 'Tip') {
				$scope.stockTip();
			}
		} else if(!$scope.tab) {
			$scope.spotLevel();
		}

	}; 

	//Share
	$scope.share = function () {	
		window.plugins.socialsharing.share('Follow Nifty', 'Nifty Spot Level', null, 'https://play.google.com/store/apps/details?id=com.smart.droid.stock.tip');
		$("#menu").hide(100);
	};

	//Rate
	$scope.rate = function () {	
		var version = device.platform;
		if(version == "Android") {
			var url = "market://details?id=com.smart.droid.stock.tip";
	        window.open(url,"_system");			
		} else {
		}
		$("#menu").hide(100);
	};

	//Feedback
	$scope.feedback = function () {	
		cordova.plugins.email.open({
			to:      'gfservices2013@gmail.com',
			subject: 'Feedback on Nifty Spot Level',
			body:    '',
			isHtml:  true
		});
		$("#menu").hide(100);
	};


	//Display Spot Level
    $scope.spotLevel = function() {
		$scope.tab = 1;
		if(window.analytics) {
			window.analytics.trackView('Spot Level');
		}	
		$scope.spot = null;
		$scope.loading = true;

		var promise = dataService.collectRemoteSpot();	
		promise.then ( function(data) { 
			//console.log("Payload : " + JSON.stringify(data));
            $scope.spot = data.spot;
            $scope.loading = false;
        }, function(errorPayload) {
        	//FIXME - Display error message here
            console.log('Failure loading spot level', errorPayload);
            $scope.loading = false;
        });
 	 };

	//Display Stock Alert
    $scope.stockAlert = function() {
		$scope.tab = 3;
		if(window.analytics) {
			window.analytics.trackView('Stock Alert');
		}	
		$scope.alert = null;
		$scope.loading = true;
		var promise = dataService.collectRemoteAlert();	
		promise.then ( function(data) { 
			//console.log("Payload : " + JSON.stringify(data));
            $scope.alert = data.alert;
            $scope.loading = false;
        }, function(errorPayload) {
        	//FIXME - Display error message here
            console.log('Failure loading stock alert', errorPayload);
            $scope.loading = false;
        });
    };

	//Display Stock Tips
    $scope.stockTip = function() {
		$scope.tab = 2;

		if(!$scope.tipTab) {
			$scope.activeTips();
		}
    };

	//Display Active Tips
    $scope.activeTips = function() {
		$scope.tipTab = 1;
		if(window.analytics) {
			window.analytics.trackView('Stock Tip - Active');
		}	

		$scope.tips = null;
		$scope.tip = null;
		$scope.loading = true;

		var promise = dataService.getActiveTip();
       	promise.then ( function(data) { 
       		//console.log("Payload : " + JSON.stringify(data));
       		$scope.tips = data.tips;
            $scope.loading = false;
        }, function(errorPayload) {
        	//FIXME - Display error message here
            console.log('Failure loading stock tips', errorPayload);
            $scope.loading = false;
        });		
    };

	//Display Archive Tips
    $scope.archiveTips = function() {
		$scope.tipTab = 2;
		if(window.analytics) {
			window.analytics.trackView('Stock Tip - Archive');
		}	

		$scope.tips = null;
		$scope.tip = null;
		$scope.loading = true;

		var promise = dataService.getArchiveTip();
       	promise.then ( function(data) { 
       		//console.log("Payload : " + JSON.stringify(data));
       		$scope.tips = data.tips;
            $scope.loading = false;
        }, function(errorPayload) {
        	//FIXME - Display error message here
            console.log('Failure loading stock tips', errorPayload);
            $scope.loading = false;
        });		
    };

    //Display tip detail
    $scope.showTipDetail = function(tipId) {
		$scope.tips = null;
		$scope.loading = true;
    	//console.log("Display Tip Detail for - " + tipId);

		var promise = dataService.getTipDetail(tipId);
       	promise.then ( function(data) { 
       		//console.log("Payload : " + JSON.stringify(data));
       		$scope.tip = data.tip;
            $scope.loading = false;
        }, function(errorPayload) {
        	//FIXME - Display error message here
            console.log('Failure loading stock tip detail', errorPayload);
            $scope.loading = false;
        });		


    } 
	
	$scope.showHome();
  }]
);

// Controller to display Nifty Spot
/*
stockControllers.controller('SpotListCtrl', ['$scope', 'DataService', '$interval',
  function($scope, dataService, $interval) {

	$scope.refresh = function () {
		window.plugins.spinnerDialog.show();
		hideMenu();
		var spots = dataService.fetchFreshSpot();
		$scope.spot = spots;
		window.plugins.spinnerDialog.hide();
    };


	//Show Spot Listing Page
	$scope.listSpot = function () {
		window.plugins.spinnerDialog.show();
		hideMenu();
		var spots = dataService.fetchSpot();
		$scope.spot = spots;
		window.plugins.spinnerDialog.hide();
		$interval(this.refresh, 5000, 1);
	}; 

	$scope.routeTo = function(url) {
      $window.location.href = url;
    };

	//Display Nifty Spot
	$scope.listSpot();
  }]
);

// Controller to display Nifty Alert
stockControllers.controller('AlertListCtrl', ['$scope', 'DataService', '$interval',
  function($scope, dataService, $interval) {
  
	//Show Spot Listing Page
	$scope.listAlert = function () {
		window.plugins.spinnerDialog.show();
		hideMenu();
		var alerts = dataService.fetchAlert();
		//FIXME - Error Handling Here
		$scope.alert = alerts;
		window.plugins.spinnerDialog.hide();
		$interval(this.refresh, 5000, 1);
	}; 

	$scope.refresh = function ()
    {
		window.plugins.spinnerDialog.show();
		hideMenu();
		var alerts = dataService.fetchFreshAlert();
		//FIXME - Error Handling Here
		console.log("Refreshing Alert");
		$scope.alert = alerts;
		window.plugins.spinnerDialog.hide();
    };

	//Display Nifty Alert
	$scope.listAlert();
	
  }]
);

// Controller to display Nifty Tips
stockControllers.controller('TipListCtrl', ['$scope', 'DataService', '$interval',
  function($scope, dataService, $interval) {
	
	//Show Spot Listing Page
	$scope.listTip = function () {
		window.plugins.spinnerDialog.show();
		hideMenu();
		var tips = dataService.fetchTip();
		//FIXME - Error Handling Here
		$scope.tip = tips;
		window.plugins.spinnerDialog.hide();
		//$interval(showInterstitial, 5000);
		//FIXME - Style the message and give option for refresh
		//$('#app-status-ul').html("Failed to collect data"); 

	}; 
	
	$scope.refresh = function ()
    {
		window.plugins.spinnerDialog.show();		
		hideMenu();
		var tips = dataService.fetchFreshTip();
		//FIXME - Error Handling Here
		$scope.tip = tips;
		window.plugins.spinnerDialog.hide();
    };


	//Display Nifty Tip
	$scope.listTip();
	
  }]
);
*/

// Controller to display Nifty Tip Detail
stockControllers.controller('TipDetailCtrl', ['$scope', '$routeParams',  'DataService',
  function($scope, $routeParams, dataService) {
	
	//Display Tip Detail
	$scope.displayTipDetail = function () {
		var tipId = $routeParams.id;
		var tip = dataService.fetchTipDetail(tipId);
		$scope.tip = tip;

		  SomaJS.loadAd({
		    adDivId : "smaatoad",
		    publisherId: 1100006441,
		    adSpaceId: 130073438,
		    dimension: "full_320x480"
		  },callBackForSmaato);
		
	}; 

	//Display Nifty Tip Detail
	$scope.displayTipDetail();
	
  }]
);





