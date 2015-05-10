/* Services */
var stockServices = angular.module('stockServices', ['ngResource']);
stockServices.factory('Spot', ['$resource',
	function($resource){
		var url =  "http://nodejs-smartdroidies.rhcloud.com/stock/spot";
		return $resource( url, {}, {
			query: { method: "GET", isArray: false }
		});
}]);


//Factory for loading the tips from Local Storage
stockServices.factory ('StorageService', function () {
	var factory = {}; 

	factory.collectSpot = function () {	
		var key =  'lsnsl.nifty_spot';
		var data =  window.localStorage.getItem(key);
		console.log('Collecting Nifty Spot from Local Storage');
		return JSON.parse(data);
	}
	
	return factory;
}); 


//Factory for managing spot
stockServices.factory ('DataService', function (StorageService, cacheService) {
	var factory = {}; 
	
	//Fetch All Spot 
	factory.fetchSpot = function() {
		var key =  'nifty_spot';
		var spots = cacheService.get(key);
		if(!spots) {
			spots = StorageService.collectSpot();
			if(spots) {
				cacheService.put(key, spots);
			}
		}
		return spots;
	}

	//Fetch Fresh Spot Data
	factory.fetchFreshSpot = function() {
		var key =  'nifty_spot';
		var spots = cacheService.remove(key);
		return this.fetchSpot();
	}

    return factory;
}); 


/* Cache Services */
var cacheServices = angular.module('cacheService', []);
cacheServices.factory('cacheService', ['$cacheFactory', function ($cacheFactory) {
			return $cacheFactory('stock-cache');
		}
]);

