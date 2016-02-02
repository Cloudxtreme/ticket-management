App.controller('LogoutController', ['$scope','$rootScope','$state','$http', function($scope,$rootScope, $state,$http) {
	localStorage.clear();
	console.log(localStorage.getItem("uuid"));
	console.log(localStorage.getItem("token"));
	$state.go('app.login');
}]);
