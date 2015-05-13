/* Directives */
var stockDirective = angular.module('stockDirective',  []);

stockDirective.directive('statusIcon', function() {
	return {
		template: "images/status_0.png"
		/*
		if(entry.call == 'B') {
			template: 'Buy {{entry.script}} at {{entry.rate}}'
		} else {
			template: 'Sell {{entry.script}} at {{entry.rate}}'
		}
		*/	
	};
});
