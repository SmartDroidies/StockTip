/* Directives */
var stockDirective = angular.module('stockDirective',  []);

stockDirective.directive('tipDesc', function() {
	return {
		 template: 'Nothing' 
		/*
		if(entry.call == 'B') {
			template: 'Buy {{entry.script}} at {{entry.rate}}'
		} else {
			template: 'Sell {{entry.script}} at {{entry.rate}}'
		}
		*/	
	};
});
