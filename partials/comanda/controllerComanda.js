

/************************************
*
*
*
/*************************************
*/

'use strict';

angular.module("myApp.comandaPick" , [ "shared" , "ui.bootstrap" , "ui.bootstrap.tpls"])

.controller('comandaCtrl' , ['$scope', '$rootScope' , '$location' , '$routeParams' , 'services' ,function ($scope ,  $rootScope, $location, $routeParams, services , dialogService)  {

		$scope.comandaPageItem = {};
		

		$scope.portate = [{ "_id" : 1479691518620 , "prezzo" : 12.22 , "category" : "SECONDI" , "formati" : [ { "_id" : 1479691498294 , "nome" : "costa caro" , "prezzo" : 8}, { "_id" : 1479691498295 , "nome" : "+caro" , "prezzo" : 10}] , "extraNome" : "kdjfs" , "extraPrezzo" : 12.33 , "nome" : "pesce"},
		{ "_id" : 1479744769267 , "nome" : "ewfff" , "prezzo" : 2 , "category" : "PRIMI" , "formati" : [ { "_id" : 1479744750640 , "nome" : "ciao" , "prezzo" :  1 }]}

		]
		

		$scope.pickPortata = function (rigaID, formatoID){
			console.log(formatoID);
			var comanda = {};
			angular.forEach($scope.portate , function(item){
				if (item._id == rigaID){
					angular.forEach(item.formati, function(formato){
						if (formato._id == formatoID){
							comanda.formato = formato.nome;
							comanda.formato_p = formato.prezzo;
						}
					})
					comanda.nome = item.nome
					comanda.prezzo = item.prezzo;
					comanda.extra = item.extraNome;
					comanda.extra_prezzo = item.extraPrezzo;
					comanda.stato = "OPEN";
					var comId = getNext();
					$scope.comandaPageItem["a" + comId] = comanda;
					
					
				}
			})

		}
		$scope.removeComanda = function ( comandaID ){
			delete $scope.comandaPageItem[comandaID]
		}
}])
