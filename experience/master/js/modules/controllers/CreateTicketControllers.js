/**=========================================================
* Module: CreateTicketController.js
* Main Application Controller
=========================================================*/

App.controller('CreateTicketController', ['$rootScope', '$scope', '$state',
'$http','ngDialog','$location',
function ($rootScope, $scope, $state, $http,ngDialog,$location) {

  var createURL= BASE_URL +"/users/12/tickets",
  classifyURL= BASE_URL+"/users/12/tickets/classify";

  $scope.title = 'CreateTicket';
  $scope.requestDetails = {
    "summary" : "mouse is not working",
    "description": "mouse is not working"
  };
  $scope.priorities = ["1-Critical", "2-High", "3-Medium", "4-Low"];
  $scope.TierOneCategories = ["Project Activity ","Failure/Issue","Install/Configure","New/additional requirement/Provisioning"];
  $scope.ticketDetails = {
    "serviceCategory": "IT ",
    "projectName": "new ",
    "tierOneCategory": "",
    "tierTwoCategory": "",
    "tierThreeCategory": "",
    "urgency": "3-Medium",
    "attachment": ""
  };

   if($scope.TierOneCategories=="Project Activity")
  {
    $scope.tierTwoCategories=["software and applications","network","Email Services"];
    if($scope.tierTwoCategories=="software and applications")
    {
      $scope.tierThreeCategories=["Multiple software installation"];
    }
    if($scope.tierTwoCategories=="network")
    {
      $scope.tierThreeCategories=["site to site vpn","Project specific internet setup "];
    }
    if($scope.tierTwoCategories=="Email Services")
    {
      $scope.tierThreeCategories=["N/A"];
    }
  
  }
      
	 if($scope.TierOneCategories=="Failure/Issue") 
	 {
		 $scope.tierTwoCategories=["Hardware and accessories"];
		 $scope.tierThreeCategories=["Laptop hardware","Desktop hardware ","Accessories"];
	 }
  
     
  if($scope.TierOneCategories=="Install/Configure")
  {
    $scope.tierTwoCategories=["Hardware and accessories"];
    $scope.tierThreeCategories=["Laptop hardware","Desktop hardware","Accessories"];
  }
  if($scope.TierOneCategories=="Project Activity")
  {
    $scope.tierTwoCategories=["Hardware and accessories","SCM(CC/SVN/Bugzilla/RTC/RFT/RPT/Other tools)","Network","software and applications","Email Services"];
    if($scope.tierTwoCategories=="Hardware and accessories")
    {
      $scope.tierThreeCategories=["Disk resizing/ partitioning","Drivers"];
    }
    if($scope.tierTwoCategories=="SCM(CC/SVN/Bugzilla/RTC/RFT/RPT/Other tools)")
    {
      $scope.tierThreeCategories=["Other Rational Product"];
    }
    if($scope.tierTwoCategories=="Network")
    {
      $scope.tierThreeCategories=["Project specific access"];
    }
    if($scope.tierTwoCategories=="software and applications")
    {
      $scope.tierThreeCategories=["Client Operating system - Microsoft based","Software download"];
    }
    if($scope.tierTwoCategories=="Email Services")
    {
      $scope.tierThreeCategories=["Outlook client"];
    }
  
  }
  if($scope.TierOneCategories=="New/additional requirement/Provisioning")
  {
    $scope.tierTwoCategories=["Other IT Services"];
    $scope.tierThreeCategories=["New WebEx account"];
  }
 


  // Fetch Data using APIs
  $scope.div1 = true;
  $scope.div2 = false;
   $scope.fillAllDetails=false;
  $scope.next=function() {
	  if($scope.myForm.$valid){
    $scope.div1 = false;
    $scope.div2 = true;
    console.log($scope.requestDetails.summary);
    var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      //  "Authorization": "Bearer " + localStorage.getItem("token")
    };

    var request = {
      method: 'POST',
      url: classifyURL,
      data: $scope.requestDetails,
      headers: headers
    };

    $http(request)
    .success(function(data, status, headers, config) {

      console.log(data);
      $scope.ticketDetails.serviceCategory = data.ticketDetails.serviceCategory;
      $scope.ticketDetails.projectName = data.ticketDetails.projectName;
      $scope.ticketDetails.tierOneCategory = data.ticketDetails.tierOneCategory;
      $scope.ticketDetails.tierTwoCategory = data.ticketDetails.tierTwoCategory;
      $scope.ticketDetails.tierThreeCategory = data.ticketDetails.tierThreeCategory;
      $scope.ticketDetails.urgency = data.ticketDetails.urgency;
    })
    .error(function(data, status, headers, config) {
      console.log('error');
    });
	  }
	  else{
	      $scope.fillAllDetails=true;
	  }
  };


  $scope.submit=function(){
    var headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      //  "Authorization": "Bearer " + localStorage.getItem("token")
    };

    var query= {
      "requestDetails" : $scope.requestDetails,
      "ticketDetails" :$scope.ticketDetails
    }

    var request = {
      method: 'POST',
      url: createURL,
      data: query,
      headers: headers
    };

    $http(request)
    .success(function(data, status, headers, config) {

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


    })
    /* 	  .error(function(data, status, headers, config) {
    console.log('error');
  });  */
};

}
]);
