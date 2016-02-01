/**=========================================================
 * Module: DashboardController.js
 * Main Application Controller
 =========================================================*/

App.controller('DashboardController', ['$rootScope', '$scope', '$state', '$http',
  function ($rootScope, $scope, $state, $http) {
      $scope.title = 'Dashboard';

      // Fetch Data using APIs
	  
	$scope.newTicket=function(){
		console.log("inside");
		$state.go('app.CreateTicket');
	};
	
	$scope.openRequest=function(){
		console.log("inside");
		$state.go('app.OpenRequest');
	};
	
	$scope.pendingRequest=function(){
		console.log("inside");
		$state.go('app.PendingRequest');
	};

	$scope.closeRequest=function(){
		console.log("inside");
		$state.go('app.ClosedRequest');
	};
  }
]);

