'use strict'
angular.module("myApp.viewPortata" , ['ngAnimate'])

.controller('portateCtrl',['$scope' ,  '$rootScope', '$location', '$routeParams', 'services', 'dialogService' , function ($scope ,  $rootScope, $location, $routeParams, services , dialogService)  {
	
	$scope.details = function(data){
		 dialogService.showConfirmDialog(
            'Confirm!',
            //'Any unsaved edit will be discarded. Are you sure to navigate back?')
			data)
            .then(function ()
            {
                //$location.path('/admin');
            },
            function ()
            {
				//alert("canceled")
            });
	}
	$scope.categorie = [ "PRIMI" , "SECONDI" , "CONTORNI" , "BIBITE"]
	$scope.customers = [{ "_id" : 1479691518620 , "prezzo" : 12.22 , "category" : "SECONDI" , "formati" : [ { "_id" : 1479691498294 , "nome" : "costa caro" , "prezzo" : 8}, { "_id" : 1479691498295 , "nome" : "+caro" , "prezzo" : 10}] , "extraNome" : "kdjfs" , "extraPrezzo" : 12.33 , "nome" : "pesce"},
		{ "_id" : 1479744769267 , "nome" : "ewfff" , "prezzo" : 2 , "category" : "PRIMI" , "formati" : [ { "_id" : 1479744750640 , "nome" : "ciao" , "prezzo" :  1.01 }]}

		]
	$scope.dropdownItemSelected = function(categoria){
		services.getPortateCategoryFilter(categoria).then(function(response){
			$scope.customers = response.data;
		});
		$scope.selected = categoria;
	};
	$scope.sfacc = function(id){

			//$("table#details"+id).animate('fadeIn', 2000);
	}
}])
.directive('animateTrigger', ['$animate', function ($animate) {
	return function (scope, elem, attrs) {
		elem.show();
	
		var flag=true;
		elem.on('click', function () {
			  scope.$apply(function() {
				if (flag)
					$animate.addClass(elem, "fuck")
				else $animate.removeClass(elem,"fuck")
			    flag = !flag;
			  });
    });
	}
}])
