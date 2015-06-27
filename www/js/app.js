'use strict';
/* App Module */
var stockApp = angular.module('stockApp', ['ngRoute', 'ngSanitize', 'stockControllers', 'stockDirective', 'stockServices', 'cacheService', 'LocalStorageModule', 'angular-gestures', 'underscore']);

stockApp.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : 'partials/home.html',
				controller : 'HomeCtrl'
			}).when('/spotlist', {
				templateUrl : 'partials/spotlist.html',
				controller : 'SpotListCtrl'
			}).when('/alertlist', {
				templateUrl : 'partials/alertlist.html',
				controller : 'AlertListCtrl'
			}).when('/tiplist', {
				templateUrl : 'partials/tiplist.html',
				controller : 'TipListCtrl'
			}).when('/spot', {
				templateUrl : 'partials/spot.html',
				controller : 'SpotCtrl'
			}).when('/tips', {
				templateUrl : 'partials/tips.html',
				controller : 'HomeCtrl'
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
stockApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('lsnsl');
});


stockApp.constant('config', {
    appName: 'Nifty Spot Level',
    appVersion: '0.0.0',
	call: [{'B': 'Buy', 'S': 'Sell'}]
});