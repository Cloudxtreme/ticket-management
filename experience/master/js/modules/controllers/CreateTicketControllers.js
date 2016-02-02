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
  $scope.serviceCategories = ["IT", 'Admin', 'HR'];
  $scope.priorities = ["1-Critical", "2-High", "3-Medium", "4-Low"];
  $scope.tierOneCategories = [];
  $scope.ticketDetails = {
    "serviceCategory": "",
    "projectName": "new",
    "tierOneCategory": "",
    "tierTwoCategory": "",
    "tierThreeCategory": "",
    "urgency": "3-Medium",
    "attachment": ""
  };

  $scope.$watch(
    "ticketDetails.serviceCategory",
    function handleChange(newValue, oldValue) {
      $scope.populateTierOneCategories();
    }
  );

  $scope.$watch(
    "ticketDetails.tierOneCategory",
    function handleChange(newValue, oldValue) {
      $scope.populateTierTwoCategories();
    }
  );

  $scope.$watch(
    "ticketDetails.tierTwoCategory",
    function handleChange(newValue, oldValue) {
      $scope.populateTierThreeCategories();
    }
  );

  $scope.populateTierOneCategories = function() {

    console.log('service category change event fired...');

    if($scope.ticketDetails.serviceCategory === 'IT') {
      $scope.tierOneCategories = ["Project Activity ","Failure / Issue","Install / Configure","New/additional requirement/Provisioning"];
    } else {
      $scope.tierOneCategories = ["Electrical"];
    }
  }

  $scope.populateTierTwoCategories = function() {

    console.log('tier one change event fired...');

    if($scope.ticketDetails.tierOneCategory === "Project Activity") {
      $scope.tierTwoCategories = ["software and applications","network","Email Services"];
    } else if($scope.ticketDetails.tierOneCategory === "Failure / Issue") {
      $scope.tierTwoCategories=["Hardware and accessories"];
    } else if($scope.ticketDetails.tierOneCategory === "Install / Configure") {
      $scope.tierTwoCategories=["Hardware and accessories", "SCM (CC/SVN/Bugzilla/RTC/RFT/RPT/Other tools)", "Network", "software and applications", "Email Services"];
    } else if($scope.ticketDetails.tierOneCategory == "New/additional requirement/Provisioning") {
      $scope.tierTwoCategories=["Other IT Services"];
    }
  }

  $scope.populateTierThreeCategories = function() {

    console.log('tier two change event fired...');

    if($scope.ticketDetails.tierOneCategory === "Project Activity") {
      if($scope.ticketDetails.tierTwoCategory === "software and applications") {
        $scope.tierThreeCategories = ["Multiple software installation"];
      } else if ($scope.ticketDetails.tierTwoCategory === "network") {
        $scope.tierThreeCategories = ["site to site VPN", "Project specific internet setup"];
      } else if ($scope.ticketDetails.tierTwoCategory === "Email Services") {
        $scope.tierThreeCategories = ["N/A"];
      }
    } else if($scope.ticketDetails.tierOneCategory === "Failure / Issue") {
      if($scope.ticketDetails.tierTwoCategory === "Hardware and accessories") {
        $scope.tierThreeCategories = ["Laptop hardware", "Desktop hardware", "Accessories"];
      }
    } else if($scope.ticketDetails.tierOneCategory === "Install / Configure") {
      if($scope.ticketDetails.tierTwoCategory === "Hardware and accessories") {
        $scope.tierThreeCategories = ["Disk resizing/ partitioning", "Drivers"];
      } else if($scope.ticketDetails.tierTwoCategory === "SCM (CC/SVN/Bugzilla/RTC/RFT/RPT/Other tools)") {
        $scope.tierThreeCategories = ["Other Rational Product"];
      } else if($scope.ticketDetails.tierTwoCategory === "Network") {
        $scope.tierThreeCategories = ["Project specific access"];
      } else if($scope.ticketDetails.tierTwoCategory === "software and applications") {
        $scope.tierThreeCategories = ["Client Operating system - Microsoft based", "Software download"];
      } else if($scope.ticketDetails.tierTwoCategory === "Email Services") {
        $scope.tierThreeCategories = ["Outlook client"];
      }
    } else if($scope.ticketDetails.tierOneCategory === "New/additional requirement/Provisioning") {
      if($scope.ticketDetails.tierTwoCategory === "Other IT Services") {
        $scope.tierThreeCategories = ["New WebEx account"];
      }
    }
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
        $scope.ticketDetails = data.ticketDetails;
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
