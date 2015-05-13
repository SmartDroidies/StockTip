'use strict';

/* Controllers */

var stockControllers = angular.module('stockControllers', []);

stockControllers.controller('HomeCtrl', ['$scope',
  function($scope) {
	//Show Home Page
	$scope.showHome = function () {    
		$scope.status = "Display Home";
	}; 

	//Share
	$scope.share = function () {	
	};
	$scope.showHome();
  }]
);

// Controller to display Nifty Spot
stockControllers.controller('SpotListCtrl', ['$scope', 'DataService',
  function($scope, dataService) {

	$scope.refresh = function ()
    {
		$('#spinner').show();
		$('#main').hide();
		hideMenu();
		var spots = dataService.fetchFreshSpot();
		//FIXME - Error Handling Here
		$scope.spot = spots;
		$('#main').show();
		$('#spinner').hide();			
    };


	//Show Spot Listing Page
	$scope.listSpot = function () {
		$('#spinner').show();
		$('#main').hide();
		hideMenu();
		var spots = dataService.fetchSpot();
		//FIXME - Error Handling Here
		$scope.spot = spots;
		$('#main').show();
		$('#spinner').hide();			
		//FIXME - Style the message and give option for refresh
		//$('#app-status-ul').html("Failed to collect data"); 
	}; 

	//Display Nifty Spot
	$scope.listSpot();
  }]
);

// Controller to display Nifty Alert
stockControllers.controller('AlertListCtrl', ['$scope', 'DataService',
  function($scope, dataService) {
  
	//Show Spot Listing Page
	$scope.listAlert = function () {
		$('#spinner').show();
		$('#main').hide();
		hideMenu();
		var alerts = dataService.fetchAlert();
		//FIXME - Error Handling Here
		$scope.alert = alerts;
		$('#main').show();
		$('#spinner').hide();			
		//FIXME - Style the message and give option for refresh
		//$('#app-status-ul').html("Failed to collect data"); 
	}; 

	$scope.refresh = function ()
    {
		$('#spinner').show();
		$('#main').hide();
		hideMenu();
		var alerts = dataService.fetchFreshAlert();
		//FIXME - Error Handling Here
		$scope.alert = alerts;
		$('#main').show();
		$('#spinner').hide();			
    };

	//Display Nifty Alert
	$scope.listAlert();
	
  }]
);

// Controller to display Nifty Tips
stockControllers.controller('TipListCtrl', ['$scope', 'DataService',
  function($scope, dataService) {
	
	//Show Spot Listing Page
	$scope.listTip = function () {
		$('#spinner').show();
		$('#main').hide();
		hideMenu();
		var tips = dataService.fetchTip();
		//FIXME - Error Handling Here
		$scope.tip = tips;
		$('#main').show();
		$('#spinner').hide();			
		//FIXME - Style the message and give option for refresh
		//$('#app-status-ul').html("Failed to collect data"); 
	}; 
	
	$scope.refresh = function ()
    {
		$('#spinner').show();
		$('#main').hide();
		hideMenu();
		var tips = dataService.fetchFreshTip();
		//FIXME - Error Handling Here
		$scope.tip = tips;
		$('#main').show();
		$('#spinner').hide();			
    };


	//Display Nifty Tip
	$scope.listTip();
	
  }]
);






