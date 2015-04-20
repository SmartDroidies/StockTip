/* Services */
var stockServices = angular.module('stockServices', ['ngResource']);
stockServices.factory('Spot', ['$resource',
	function($resource){
		var url =  "http://nodejs-smartdroidies.rhcloud.com/stock/spot";
		return $resource( url, {}, {
			query: { method: "GET", isArray: false }
		});
}]);


/* Cache Services */
var cacheServices = angular.module('cacheService', []);
cacheServices.factory('cacheService', ['$cacheFactory', function ($cacheFactory) {
			return $cacheFactory('stock-cache');
		}
	]);
