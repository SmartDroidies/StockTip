'use strict';
/* App Module */
var stockApp = angular.module('stockApp', ['ngRoute', 'ngTouch', 'ngSanitize', 'stockControllers', 'stockDirective', 'stockServices', 'cacheService', 'underscore']);

stockApp.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : 'partials/home.html',
				controller : 'HomeCtrl'
			}).when('/notify/:type', {
				templateUrl : 'partials/home.html',
				controller : 'HomeCtrl'
			}).when('/tip/:id', {
				templateUrl : 'partials/tip.html',
				controller : 'TipDetailCtrl'
			}).when('/knowledge', {
				templateUrl : 'partials/knowledge.html',
				controller : 'HomeCtrl'
			}).when('/others', {
				templateUrl : 'partials/others.html',
				controller : 'HomeCtrl'
			}).otherwise({
				redirectTo : '/home'
			});
		}
	]);

	
//Local Storage Configuration	
/*
stockApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('lsnsl');
});
*/


stockApp.constant('config', {
    appName: 'Nifty Spot Level',
    appVersion: '0.0.0',
	call: [{'B': 'Buy', 'S': 'Sell'}]
});