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

