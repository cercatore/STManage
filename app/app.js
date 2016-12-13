var app = angular.module('myApp', 
	['myApp.portata',
	'myApp.viewPortata',
	'myApp.comandaPick',
	'ngRoute',
	'ngMessages',
	'ngAnimate',
	'shared'
	])


function getNext(){
	return new Date().getTime()
}

app.value('serviceBase' , 'https://api.mlab.com/api/1/databases/cbmanager/collections/' );

app.factory("services", ['$http' , 'serviceBase', function($http , serviceBase ) {
  var docName = "portate"
    var obj = {};
	//if (!ss ) alert("goes wrong");
	obj.insertPortata = function (customer) {
		var notify = $("div[ajax-result]");
		
		return $http.post(serviceBase + 'portate' + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf' , customer)
			.success(function (data, status, headers, config) {
				$("[ajax-prog]").hide();
				notify.show();
				notify.html("<div class='center-block'><h3>CARICAMENTO CON SUCCESSO</h3></div>")
				window.setTimeout(function (){
					notify.hide();
				},2000)
				//alert(JSON.stringify(data))
			})
			.error(function (data, status){
				alert(status)
			})
			.complete(function (){
				$("[ajax-prog]").show();
			})
		};
	obj.getAllPortate = function(){
		
		return $http.get(serviceBase + 'portate' + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf')
			.error(function (data, status){
					alert(status)
			})
		}
	obj.getPortata = function(customerID){
        return $http.get(serviceBase + 'portate/' + customerID + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf');
    }
	obj.getPortateCategoryFilter = function(category){
		var q={"category": category };
		return $http.get(serviceBase + 'portate' + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf&q=' + angular.toJson(q) )
		.error(function (data, status){
					alert(status + "\n " + JSON.stringify(data) )
			})
		}
	
	return obj;
	
}])

	
app.controller('loginCtrl',  function ($rootScope, $scope, $location, $routeParams)  {
	$scope.loginStatus = "Sign In";
	
	$scope.authenticate = function(user){
		firebase.auth().signInWithEmailAndPassword(user.name, user.pass).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  alert (error.message + "\n" + error.code)
		  // ...
		})
		$location.path('/lista_portate')		
	}
	$rootScope.logout = function(){
		firebase.auth().signOut().then(function() {
			  // Sign-out successful.
			}, function(error) {
			  // An error happened.
			});
		}
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/comanda', {
			title:"CHECAZZODAI",					// title: 'LOGIN',
			templateUrl:"/partials/comanda/comanda_new.html",			// templateUrl: 'login.html',
			controller:"comandaCtrl"					// controller: 'loginCtrl'
      })
	  .when('/lista_portate', {
		title: 'visualizza admin portate',
		templateUrl: 'partials/viewPortata/list_portate.html',
        controller: 'portateCtrl'
	  })
      .when("/admin", {
		title: 'Form Prodotto',
		templateUrl: 'partials/portata/admin_portata.html',
		controller: 'addProductCtrl'
		
	  })
	   .when('/login', {
			title: 'LOGIN',
			templateUrl: '/login.html',
			controller:"loginCtrl"					// controller: 'loginCtrl'
      })
	  .when('/' , {
			title : 'youra mess',
			templateUrl: '/partials/home.html',
			
	  })
      .otherwise({
        redirectTo: '/'
      });
}]);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //alert("user signed in")
	console.log("****************** loggedIN ");
  } else {
    console.log("**************** out");
  }
});

app.run(['$location', '$rootScope', function($location, $rootScope) {
	$rootScope.loginActions  = [ "LOGIN" ];
	$rootScope.loginStatus = "Welcome Guest"
		// const user = firebase.auth().currentUser;
				// if (user){ // getProfile
					// $rootScope.loginActions = [  "CONTACT", 'EMAIL', 'EDIT PICTURE', 'LOGOUT']
					// $rootScope.loginStatus = ( user.displayName ? user.displayName : user.email )
				// }
				// else {
					// $location.path("/login");
					// $rootScope.pusherOut = "Please login fucker...";
				// }
		
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
		// CHEK
		if (location.hostname == 'localhost' || location.hostname == '127.0.0.1' );
		else {
			
		}
    });
	$rootScope.$on('$routeChangeError', function (event, current, previous) {
		$location.path('/');
	});
}]);