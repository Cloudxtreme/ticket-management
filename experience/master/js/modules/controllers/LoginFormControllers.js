App.controller('LoginFormController', ['$scope','$rootScope','$state', '$http', function($scope,$rootScope, $state, $http) {

	var loginURL = BASE_URL + "/auth";
	
	$rootScope.showNavHeader=false;
	$rootScope.footerBtns=false;
	$rootScope.headerTitle="Login";
	$rootScope.showSidebar=false;
	$scope.inputType = 'password';
	$scope.invalidCredentials=false;
	$scope.errorMsg="";
	$scope.userCredentials = {
		username: "",
		password: ""
	};
	$scope.hideShowPassword = function(){
		if ($scope.inputType == 'password')
		$scope.inputType = 'text';
		else
		$scope.inputType = 'password';
	};

	$scope.register=function(){
		$state.go('app.register');
	};

	$scope.login = function() {

		// todo: validation code ??
		if($scope.loginForm.$valid){
			var request = {
				method: 'POST',
				url: loginURL,
				data: $scope.userCredentials
			};

			$http(request).then(function(response) {

				console.log(response.data);
				localStorage.setItem("uuid",response.data.uuid);
	            localStorage.setItem("token",response.data.token);
				console.log(localStorage.getItem("uuid"));
				console.log(localStorage.getItem("token"));
				$state.go('app.Dashboard') ;
			}, function(response) {
				console.log(response.data.message);
				$scope.errorMsg=response.data.message;
				$scope.invalidCredentials=true;
			});
		}
		
			
	};
}]);
