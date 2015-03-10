'use strict';

/* Controllers */

var stockControllers = angular.module('stockControllers', ['snap']);

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
stockControllers.controller('SpotCtrl', ['$scope',
  function($scope) {
	//Show Spot Page
	$scope.displaySpot = function () {    
		$scope.status = "Display NIFTY Spot";
	}; 

	//Display Nifty Spot
	$scope.displaySpot();
  }]
);



