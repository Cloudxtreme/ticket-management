/**=========================================================
 * Module: CreateTicketController.js
 * Main Application Controller
 =========================================================*/

App.controller('CreateTicketController', ['$rootScope', '$scope', '$state', '$http','ngDialog','$location',
  function ($rootScope, $scope, $state, $http,ngDialog,$location) {
      $scope.title = 'CreateTicket';
      $scope.createTicket={
		          "Summary" :"",
				  "Name":"",
				  "RequestType": "",
				  "Description":"",
				  "Tier1":"",
				  "Tier2":"",
				  "Tier3":"",
				  "Urgency":""
	
		   
	  };
      // Fetch Data using APIs
	  $scope.div1=true;
	  $scope.div2=false;
	  $scope.next=function(){
	  
	    $scope.div1=false;
	    $scope.div2=true;
		console.log($scope.createTicket.Summary);
		
		
	  }
	  $scope.createTicket.urgency=["1-Critical","2-High","3-Medium","4-Low"];
	   $scope.createTicket.Tier1=["1","2","3","4"];
	  $scope.createTicket.Tier2=["1","2","3","4"];
	  $scope.createTicket.Tier3=["1","2","3","4"];
	  
	  $scope.submit=function(){
	  		var dialog=ngDialog.open({
					template: 'PopUp',
					controller: ['$scope','$rootScope', '$timeout','ngDialog', function ($scope, $rootScope,$timeout,ngDialog) {

						$scope.closePopup=function(){
							$scope.closeThisDialog();
							$state.transitionTo('app.Dashboard');
						}
					}],
					className: 'ngdialog-theme-default'
				});
				
				dialog.closePromise.then(function (data) {
             //  window.location.replace("http://stackoverflow.com");
			    $location.path('/app/Dashboard').replace();
                });
	  }
	  
  }
]);

