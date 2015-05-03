/* Directives */
var stockDirective = angular.module('stockDirective',  []);

stockDirective.directive('tipDesc', function() {
	return {
		/* var _date = $filter('date')(new Date(input), 'MMM dd - HH:MM'); */
		//template: 'Name: {{customer.name}} Address: {{customer.address}}'
		template: '{{entry.call}} {{entry.script}} at {{entry.rate}}'
	};
});
