'use strict'

angular.module('myApp.cucina', ['ngAnimate'])

.controller('cucinaCtrl' ,['$scope' ,  '$rootScope', '$location', '$routeParams', 'services', 'dialogService' , function ($scope ,  $rootScope, $location, $routeParams, services , dialogService)  {

    $scope.isLoading = false;
    $scope.comandeItems = services.getAllComande()

    $scope.loadAllComande = function (){
        $scope.isLoading = true;
        $scope.comandeItems = services.getAllComande()
    }

}])