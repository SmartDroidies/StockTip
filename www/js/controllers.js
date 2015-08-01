'use strict';

/* Controllers */

var stockControllers = angular.module('stockControllers', []);

stockControllers.controller('HomeCtrl', ['$scope',
  function($scope) {
	//Show Home Page
	$scope.showHome = function () {    
		hideMenu();
	}; 

	//Share
	$scope.share = function () {	
	};
	$scope.showHome();
  }]
);

// Controller to display Nifty Spot
stockControllers.controller('SpotListCtrl', ['$scope', 'DataService', '$interval',
  function($scope, dataService, $interval) {

	$scope.refresh = function ()
    {
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
		$interval(showInterstitial, 5000);
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






