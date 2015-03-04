'use strict';
/* App Module */
var stockApp = angular.module('sotckApp', ['ngRoute', 'ngSanitize', 'ngTouch', 'stockControllers']);

stockApp.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl : 'partials/home.html',
				controller : 'HomeCtrl'
			}).
			otherwise({
				redirectTo : '/home'
			});
		}
	]);
