/************************************
*
*
*
/*************************************
*/
'use strict';

angular.module("myApp.portata" , [])

.controller('addProductCtrl', ['$scope', '$rootScope' , '$location' , '$routeParams' , 'services', function ($scope ,  $rootScope, $location, $routeParams, services)  {
	var portataID  =($routeParams.customerID) ? parseInt($routeParams.customerID) : 0;
	$scope.formati = [];
	if (portataID > 0 )
		services.getPortata(portataID).then(function (data){
			$scope.portata = angular.copy(data.data)
			$scope.formati = $scope.portata.formati;
		})
	$scope.add = function() {
    	var dataObj = {_id: getNext(), nome:'', prezzo:''};
    	$scope.formati.push(dataObj);
    }
	$scope.remove = function(_mid) {
		$scope.copy = [];
		
		$scope.formati.forEach(function (obj){
			if (obj._id != _mid)
				$scope.copy.push(obj)
		})
		$scope.formati = angular.copy($scope.copy)
	}
	$scope.saveButton = function(portata){
		if (portataID == 0 )portata._id = getNext();
		portata.formati = angular.copy($scope.formati);
		//alert(JSON.stringify(customer));
		services.insertPortata(portata);
	}
	if ($scope.formati.length == 0 ) $scope.add();
	

}]);
