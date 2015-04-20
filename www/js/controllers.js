'use strict';

/* Controllers */

var stockControllers = angular.module('stockControllers', []);

stockControllers.controller('HomeCtrl', ['$scope',
  function($scope) {
	//Show Home Page
	$scope.showHome = function () {    
		$scope.status = "Display Home";
	}; 

	//Share
	$scope.share = function () {	
	};
	$scope.showHome();
  }]
);

// Controller to display Nifty Spot
stockControllers.controller('SpotListCtrl', ['$scope', 'Spot', 'cacheService', 'localStorageService',
  function($scope, Spot, cacheService, localStorageService) {
	//Show Spot Listing Page
	$scope.listSpot = function () {
		$('#spinner').show();
		$('#main').hide();
		var key =  'nifty_spot';
		var cache = cacheService.get(key);
		var localstorage = localStorageService.get(key);
		if(cache) {
			console.log('Loading data from cache for');
			$scope.spot = cache;
			$('#main').show();
			$('#spinner').hide();
		} else if (localstorage) {
          	console.log('Loading data from Local Storage');
			if (!angular.isUndefined(localstorage)) {
				//FIXME - Put Into Cache Later 
				//cacheService.put(key, localstorage);
			}
			$scope.spot = localstorage;
			$('#main').show();
			$('#spinner').hide();			
		} else {
			//FIXME - Style the message and give option for refresh
			$('#app-status-ul').html("Failed to collect data"); 
			
		}    
	}; 
	//Display Nifty Spot
	$scope.listSpot();
  }]
);

// Controller to display Nifty Alert
stockControllers.controller('AlertListCtrl', ['$scope', 'cacheService', 'localStorageService',
  function($scope, cacheService, localStorageService) {
  
	$scope.$parent.myScrollOptions = {
        snap: false,
        onScrollEnd: function ()
        {
            alert('finshed scrolling');
        }
    };  
	
	$scope.refreshiScroll = function ()
    {
        $scope.$parent.myScroll['wrapper'].refresh();
    };
	
	//Show Spot Listing Page
	$scope.listAlert = function () {
		console.log('Controller Triggered for Alert');
		$('#spinner').show();
		$('#message').hide();
		$('#main').hide();
		var key =  'nifty_alert';
		var cache = cacheService.get(key);
		var localstorage = localStorageService.get(key);
		if(cache) {
			console.log('Loading Alert from cache');
			$scope.alert = cache;
			$('#main').show();
			$('#spinner').hide();
		} else if (localstorage) {
          	console.log('Loading Alert from Local Storage');
			if (!angular.isUndefined(localstorage)) {
				cacheService.put(key, localstorage);
			}
			$scope.alert = localstorage;
			$('#main').show();
			$('#spinner').hide();			
		} else {
			//FIXME - Display message here
			$('#message').show();
			$('#spinner').hide();			
		}    
	}; 
	
	//Display Nifty Alert
	$scope.listAlert();
	
  }]
);

// Controller to display Nifty Tips
stockControllers.controller('TipListCtrl', ['$scope', 'cacheService', 'localStorageService',
  function($scope, cacheService, localStorageService) {
	
	//Show Spot Listing Page
	$scope.listTip = function () {
		console.log('Controller Triggered for Tip');
		$('#spinner').show();
		$('#message').hide();
		$('#main').hide();
		var key =  'nifty_tip';
		var cache = cacheService.get(key);
		var localstorage = localStorageService.get(key);
		if(cache) {
			console.log('Loading Tip from cache');
			$scope.tip = cache;
			$('#main').show();
			$('#spinner').hide();
		} else if (localstorage) {
          	console.log('Loading Tip from Local Storage');
			if (!angular.isUndefined(localstorage)) {
				//cacheService.put(key, localstorage);
			}
			$scope.tip = localstorage;
			$('#main').show();
			$('#spinner').hide();			
		} else {
			//FIXME - Display message here
			$('#message').show();
			$('#spinner').hide();			
		}    
	}; 
	
	//Display Nifty Tip
	$scope.listTip();
	
  }]
);






