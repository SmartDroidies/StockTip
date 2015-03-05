'use strict';
/* App Module */
var stockApp = angular.module('sotckApp', ['ngRoute', 'ngSanitize', 'ngTouch', 'stockControllers']);

stockApp.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : 'partials/home.html',
				controller : 'HomeCtrl'
			}).when('/spot', {
				templateUrl : 'partials/spot.html',
				controller : 'HomeCtrl'
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
				redirectTo : '/spot'
			});
		}
	]);
