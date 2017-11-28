

/************************************
*
*
*
/*************************************
*/

'use strict';

angular.module("myApp.comandaPick" , [ "shared" , "ui.bootstrap" , "ui.bootstrap.tpls"])

.controller('comandaCtrl' , ['$scope', '$rootScope' , '$location' , '$routeParams' , 'services' ,function ($scope ,  $rootScope, $location, $routeParams, services , dialogService)  {

		$scope.comandaSelect = "Pick Course Category"
		$scope.comandaPageList = {};

		$scope.isLoading = false;
		$scope.categorie = [ "PRIMI" , "SECONDI" , "CONTORNI" , "BIBITE"]

		$scope.dropdownItemSelected = function(categoria){
			$scope.isLoading = true
			services.getPortateCategoryFilter(categoria).then(function(response){
				$scope.portate = response.data;
				$scope.isLoading = false
			});
			$scope.selected = categoria;
		};

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
					comanda.tavolo = "18";
					var comId = getNext();
					$scope.comandaPageList["a" + comId] = comanda;


				}
			})

		}

		$scope.removeComanda = function ( comandaID ){
			delete $scope.comandaPageList[comandaID]
		}
}])
	.controller( "addComandaCtrl" , ['$scope', '$rootScope' , '$location' , '$routeParams' , 'services', 'dialogService', function ($scope ,  $rootScope, $location, $routeParams, services , dialogService)  {
        $scope.saveComanda = function () {
            // riordino le comande mettendo lo stesso tavolo
            angular.forEach($scope.comandaPageList, function(itemComanda) {
                var tavolo = 19;
                itemComanda.tavolo = tavolo;

                services.insertComanda(itemComanda);
            })

        }
				$scope.noPanic = function(data){
					 dialogService.showConfirmDialog(
			            'ORDER SENT TO WORKERS!',
						data)
			            .then(function ()
			            {
			            },
			            function ()
			            {
			            });
				}
    }])
