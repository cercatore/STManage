/*******************************************
*
*
*********************************************/

var app = angular.module('myApp',
	['myApp.portata',
	'myApp.viewPortata',
	'myApp.comandaPick',
	'myApp.chat',
	'ngRoute',
	'ngMessages',
	'ngAnimate',
	'shared',
	'firebase'

	])

var user;

app.controller('homeController' , function ($rootScope, $scope, $firebaseAuth , $location){
	this.dataData = {};
	var auth = $firebaseAuth();
	this.hasFinished = 'non voglio vivere cosi cerca qualcosa';
	this.signInNormal = (user ) => {
		auth.$signInWithEmailAndPassword(user.email, user.password)
			.then(
				function(firebaseUser){
					$rootScope.rightPath = "signedin";
					$rootScope.userloggedin = "Ciao " + firebaseUser.email + ", well";
					user = firebaseUser;
					$location.path('/lista_portate')
				  console.log("Signed in as:", firebaseUser.uid);
				}
			)

			.catch(function (error) {
				console.log("athentication error " + error )
				$location.path('/500');
			})
		}
this.signInFacebook = () => {
		auth.$signInWithPopup("facebook").then(function(firebaseUser) {
			//TODO $rootScope.user = firebaseUser.uid;
	 console.log("FB Signed in as:", firebaseUser.uid);
 }).catch(function(error) {
	 console.log("FB Authentication failed:", error);
 });
}

this.signInGoogle = () => {
		auth.$signInWithPopup("google").then((firebaseUser)=>{
		console.log("G+ Signed in as:", firebaseUser.uid);
	}).catch(function(error) {
 	 console.log("FB Authentication failed:", error);
  });
}
$rootScope.logout = function(){
	auth.$signOut().then(function() {
			// Sign-out successful.
		}, function(error) {
			// An error happened.
		});
	}



})
firebase.auth().onAuthStateChanged(function(_user) {
	user = _user
  if (user) {
    //alert("user signed in")
		var check = angular.element(document).scope().rightPath;
		if ( check !== undefined && check !== '');
			// else window.location.href = "http://" + window.location.hostname + "/404"
		angular.element(document).scope().userloggedin = "Ciao " + user.email;
		console.log("****************** loggedIN ");
  } else {
		try{
			angular.element(document).scope().userloggedin = "perfavore fai login";
		}catch(err){}
    console.log("**************** out");
  }
});

function getNext(){
	return new Date().getTime()
}

app.value('serviceBase' , 'https://api.mlab.com/api/1/databases/cbmanager/collections/' );
app.value('categorieHC' , [ "FIRST COURSE" , "SECOND COURSE" , "SIDE DISHES" , "BEVERAGES"]);

app.factory("services", ['$http' , 'serviceBase', function($http , serviceBase ) {
  var docName = "portate"
    var obj = {};
	//if (!ss ) alert("goes wrong");
	obj.insertPortata = function (customer) {
		var notify = $("div[ajax-result]");

		return $http.post(serviceBase + docName + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf' , customer)
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

		return $http.get(serviceBase + docName + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf')
			.error(function (data, status){
					alert(status)
			})
		}
	obj.getPortata = function(customerID){
        return $http.get(serviceBase + docName+ '/' + customerID + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf');
    }
	obj.getPortateCategoryFilter = function(category){
		var q={"category": category };
		return $http.get(serviceBase + docName + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf&q=' + angular.toJson(q) )
		.error(function (data, status){
					alert(status + "\n " + JSON.stringify(data) )
			})
		}
	obj.catArray = [ "PRIMI" , "SECONDI" , "CONTORNI" , "BIBITE"];

	obj.insertComanda = function(itemComanda){
        return $http.post(serviceBase + 'comande' + '?apiKey=LC-wif-orODQhsURWZf43a-I0x2hjhIf' , itemComanda)
			.error( function ( data, status) {
				alert(status)
            })
	}

	return obj;

}])


app.controller('loginCtrl',  function ($rootScope, $scope, $location, $routeParams)  {
	$scope.loginStatus = "Sign In";
	$scope.user = "you are claudio"

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

});


app.config(
  function($routeProvider, $httpProvider) {
	  	//alert ("useXDomain prop is " + $httpProvider.defaults.useXDomain)
    $routeProvider.
      when('/comanda', {
			title:"PRFESSIONAL HOME PAGE DEVELOPER CLAUDIO",					// title: 'LOGIN',
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
	  .when('/home' , {
			title : 'NUTELLA',
			templateUrl: 'homeComponent/home.html',
			controller : 'homeController'

		})
		.when('/404' , {
		 		title: 'blabla',
			  templateUrl: 'homeComponent/404.html',
		})
		.when( '/500' , {
				title: '500',
				templateUrl: 'homeComponent/500.html'
		})
		.when( '/chat' , {
			title:'chat',
			templateUrl: 'chat/room.html',
			controller: 'chatController as control'
		})
    .otherwise({
        redirectTo: '/chat'
    });
});


app.run(['$location', '$rootScope', function($location, $rootScope) {
	$rootScope.loginActions  = [ "LOGIN" ];
	if (user) {
		$rootScope.loginStatus = "VAI DOVE VUOI";
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
		});
	}
		else{
			//$location.path('/404');
		}
	$rootScope.$on('$routeChangeError', function (event, current, previous) {
		$location.path('/404');
	});
}]);
