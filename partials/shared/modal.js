angular.module('shared',['ui.bootstrap', 'ui.bootstrap.tpls', 'ngAnimate'])
.factory("dialogService",["$q", "$uibModal" , function ($q, $modal)
{
    var obj = {} 
	obj.showConfirmDialog = function (title, message)
    {
        var defer = $q.defer();
		
        var modalInstance = $modal.open({
            animation: true,
			backdrop: true,
            size: "lg",
            templateUrl: '/partials/shared/confirmationBox.html',
            controller: function ($scope)
            {
                $scope.title = title;
				$scope.message = message;

                $scope.ok = function ()
                {
                    modalInstance.close();
                    defer.resolve();
                };

                $scope.cancel = function ()
                {
                    modalInstance.dismiss();
                    defer.reject();
                };
            }
        });
		
		return defer.promise;
    }

    return obj;
}])

function getNext(){
	return new Date().getTime()
}