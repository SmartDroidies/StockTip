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

	//Collect the list of Spot from LocalStorage
	factory.collectSpot = function () {	
		var key =  'lsnsl.nifty_spot';
		var data =  window.localStorage.getItem(key);
		//console.log('Collecting Nifty Spot from Local Storage');
		return JSON.parse(data);
	}

	//Collect the list of Tip from LocalStorage
	factory.collectTip = function () {	
		var key =  'lsnsl.nifty_tip';
		var data =  window.localStorage.getItem(key);
		//console.log('Collecting Nifty Tip from Local Storage');
		return JSON.parse(data);
	}

	//Collect the list of Alert from LocalStorage
	factory.collectAlert = function () {	
		var key =  'lsnsl.nifty_alert';
		var data =  window.localStorage.getItem(key);
		//console.log('Collecting Nifty Alert from Local Storage');
		return JSON.parse(data);
	}

	return factory;
}); 


//Factory for managing spot
stockServices.factory ('DataService', function (StorageService, cacheService, _) {
	var factory = {}; 
	
	//Fetch All Spot 
	factory.fetchSpot = function() {
		var key =  'nifty_spot';
		var spots = cacheService.get(key);
		if(!spots) {
			spots = StorageService.collectSpot();
			if(spots) {
				spots = _.sortBy(spots, "_id").reverse();
				spots = spots.slice(0, 10);
				//cacheService.put(key, spots);
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

	//Fetch All Tip 
	factory.fetchTip = function() {
		var key =  'nifty_tip';
		var tips = cacheService.get(key);
		if(!tips) {
			tips = StorageService.collectTip();
			if(tips) {
				//cacheService.put(key, tips);
			}
		}
		return tips;
	}

	//Fetch Fresh Tip Data
	factory.fetchFreshTip = function() {
		var key =  'nifty_tip';
		var spots = cacheService.remove(key);
		return this.fetchTip();
	}

	//Fetch All Alert 
	factory.fetchAlert = function() {
		var key =  'nifty_alert';
		var alerts = cacheService.get(key);
		if(!alerts) {
			alerts = StorageService.collectAlert();
			if(alerts) {
				//cacheService.put(key, alerts);
			}
		}
		return alerts;
	}

	//Fetch Fresh Alert Data
	factory.fetchFreshAlert = function() {
		var key =  'nifty_alert';
		var spots = cacheService.remove(key);
		return this.fetchAlert();
	}


    return factory;
}); 


/* Cache Services */
var cacheServices = angular.module('cacheService', []);
cacheServices.factory('cacheService', ['$cacheFactory', function ($cacheFactory) {
			return $cacheFactory('stock-cache');
		}
]);

