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
    "summary" : "",
    "description": ""
  };
  $scope.priorities = ["1-Critical", "2-High", "3-Medium", "4-Low"];
  $scope.tierOneCategory = ["Project Activity ","Failure/Issue","Install/Configure","New/additional requirement/Provisioning"];
  $scope.ticketDetails = {
    "requestType": "IT ",
    "projectName": "new ",
    "tierOneCategory": "",
    "tierTwoCategory": "",
    "tierThreeCategory": "",
    "urgency": "3-Medium",
    "attachment": ""
  };

  // if($scope.Tier1=="Project Activity")
  // {
  //   $scope.Tier2=["software and applications","network","Email Services"];
  //   if($scope.Tier2=="software and applications")
  //   {
  //     $scope.Tier3=["Multiple software installation"];
  //   }
  //   if($scope.Tier2=="network")
  //   {
  //     $scope.Tier3=["site to site vpn","Project specific internet setup "];
  //   }
  //   if($scope.Tier2=="Email Services")
  //   {
  //     $scope.Tier3=["N/A"];
  //   }
  //
  // }
  // if($scope.Tier1=="Install/Configure")
  // {
  //   $scope.Tier2=["Hardware and accessories"];
  //   $scope.Tier3=["Laptop hardware","Desktop hardware","Accessories"];
  // }
  // if($scope.Tier1=="Project Activity")
  // {
  //   $scope.Tier2=["Hardware and accessories","SCM(CC/SVN/Bugzilla/RTC/RFT/RPT/Other tools)","Network","software and applications","Email Services"];
  //   if($scope.Tier2=="Hardware and accessories")
  //   {
  //     $scope.Tier3=["Disk resizing/ partitioning","Drivers"];
  //   }
  //   if($scope.Tier2=="SCM(CC/SVN/Bugzilla/RTC/RFT/RPT/Other tools)")
  //   {
  //     $scope.Tier3=["Other Rational Product"];
  //   }
  //   if($scope.Tier2=="Network")
  //   {
  //     $scope.Tier3=["Project specific access"];
  //   }
  //   if($scope.Tier2=="software and applications")
  //   {
  //     $scope.Tier3=["Client Operating system - Microsoft based","Software download"];
  //   }
  //   if($scope.Tier2=="Email Services")
  //   {
  //     $scope.Tier3=["Outlook client"];
  //   }
  //
  // }
  // if($scope.Tier1=="New/additional requirement/Provisioning")
  // {
  //   $scope.Tier2=["Other IT Services"];
  //   $scope.Tier3=["New WebEx account"];
  // }



  // Fetch Data using APIs
  $scope.div1 = true;
  $scope.div2 = false;
  $scope.next=function() {
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
      $scope.ticketDetails.requestType = data.ticketDetails.serviceCategory;
      $scope.ticketDetails.projectName = data.ticketDetails.projectName;
      $scope.ticketDetails.tierOneCategory = data.ticketDetails.tierOneCategory;
      $scope.ticketDetails.tierTwoCategory = data.ticketDetails.tierTwoCategory;
      $scope.ticketDetails.tierThreeCategory = data.ticketDetails.tierThreeCategory;
      $scope.ticketDetails.urgency = data.ticketDetails.urgency;
    })
    .error(function(data, status, headers, config) {
      console.log('error');
    });

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
