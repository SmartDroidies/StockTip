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
stockServices.factory ('DataService', function (StorageService, cacheService, _, $http, $log, $q) {
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

	//Function to return active tips.
	factory.fetchActiveTips = function() {
		var tips = this.fetchFreshTip();
		tips = _.filter(tips, function(tip) {
			return (tip.active == 'Y'); 
		});
		return tips;		
	}  

	//Function to return active tips.
	factory.fetchArchiveTips = function() {
		var tips = this.fetchFreshTip();
		tips = _.filter(tips, function(tip) {
			return (tip.active != 'Y'); 
		});
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

	//Collect tip details 
	factory.fetchTipDetail = function(tipId) {
		var tips = this.fetchTip();			
		//console.log("Collect tip detail for : " + tipId);
		var tip = _.find(tips, function(rw, rwIdx) { 
			//console.log("Compare : " + tipId   + " : " + rw._id);
			if(tipId == rw._id) {
				return true;
			}
		});
		return tip;
	} 

	// Collect Spot Level from Remote server
	factory.collectRemoteSpot = function() {
		return $http.get('http://nodejs-smartdroidies.rhcloud.com/stock/spot')
        	.then (	function (response) {
                return {
                   	ts: response.data.ts,
                   	spot:  response.data.data
                }
            });
	} 

	// Collect Stock Alert from Remote server
	factory.collectRemoteAlert = function() {
		return $http.get('http://nodejs-smartdroidies.rhcloud.com/stock/alert')
        	.then (	function (response) {
                return {
                   	ts: response.data.ts,
                   	alert:  response.data.data
                }
            });
	} 

	// Collect Stock Tip from Remote server
	factory.getActiveTip = function() {
		var deferred = $q.defer();
    	$http.get('http://nodejs-smartdroidies.rhcloud.com/stock/tip')
    		.then(function(response) { 
    			//$log.info("Response : " + JSON.stringify(response.data));
    			var active = _.filter(response.data.data, function(tip) {
					return (tip.active == 'Y'); 
				});
          		deferred.resolve({ ts: response.data.title, tips: active});
       		}, function errorCallback(response) {
          		deferred.reject(response);
    			$log.error(response);
       		});
     	return deferred.promise;
	} 

	// Collect Stock Tip from Remote server
	factory.getArchiveTip = function() {
		var deferred = $q.defer();
    	$http.get('http://nodejs-smartdroidies.rhcloud.com/stock/tip')
    		.then(function(response) { 
    			//$log.info("Response : " + JSON.stringify(response.data));
    			var archive = _.filter(response.data.data, function(tip) {
					return (tip.active != 'Y'); 
				});
          		deferred.resolve({ ts: response.data.title, tips: archive});
       		}, function errorCallback(response) {
          		deferred.reject(response);
    			$log.error(response);
       		});
     	return deferred.promise;
	} 


    return factory;
}); 


//

/* Cache Services */
var cacheServices = angular.module('cacheService', []);
cacheServices.factory('cacheService', ['$cacheFactory', function ($cacheFactory) {
			return $cacheFactory('stock-cache');
		}
]);

