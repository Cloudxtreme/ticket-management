/**=========================================================
 * Module: ViewSummaryController.js
 * Main Application Controller
 =========================================================*/

App.controller('OpenRequestController', ['$rootScope', '$scope', '$state', '$http',
  function ($rootScope, $scope, $state, $http) {
      $scope.title = 'Open Request';

      // Fetch Data using APIs
	  
	    $scope.tickets = [];  
        $scope.count=0;		
        var url = BASE_URL + "/users/"+localStorage.getItem("uuid")+"/tickets/search";
        if (localStorage.getItem("uuid") != undefined) {

            $scope.pagination = {
                noOfPages: 1,
                currentPage: 0,
                pageSize: 3
            };
			
			
            $scope.loadMore = function() {
				if ($scope.loadingResult) 
			{ 
		       return; 
			} 
		   if ($scope.pagination.currentPage >= $scope.pagination.noOfPages) 
			{
				return; 
		    }  
                $scope.pagination.currentPage = $scope.pagination.currentPage + 1;
                $scope.offset = ($scope.pagination.currentPage - 1) * $scope.pagination.pageSize;
                $scope.limit = $scope.pagination.pageSize;
                $scope.loadingResult = true;
				var requestQuery = {
                'status': ['OPEN'],
                'queryType': 'DETAILS',
				'offset':$scope.offset,
				'limit':$scope.limit
                };
                var headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
                };

                var request = {
                method: 'POST',
                url: url,
                data: requestQuery,
                headers: headers
                };
				
				$http(request)
                    .success(function(data, status, headers, config) {
						
						console.log(JSON.stringify(data.tickets[0]));
                        console.log(JSON.stringify(data.tickets[0].uuid));
						$scope.tickets = $scope.tickets.concat(data.tickets[0]);	                      
                         $scope.loadingResult = false;
                      })
             .error(function(data, status, headers, config) {
                 console.log('error');
             }); 
           };
			 
                $scope.initializeResultList = function() {
					
				   var consignmentQuery = {
                'status': ['OPEN'],
                'queryType': 'DETAILS',
				'offset':0,
				'limit':0
                };
                var headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")
                };

                var request = {
                method: 'POST',
                url: url,
                data: consignmentQuery,
                headers: headers
                };
				
				$http(request)
                    .success(function(data, status, headers, config) {
						$scope.count=data.count;
						//alert(data.count);
						 $scope.total = $scope.count;
						 $scope.pagination.noOfPages = Math.ceil($scope.count / $scope.pagination.pageSize);
		             })
             .error(function(data, status, headers, config) {
                 console.log('error');
             }); 
		       $scope.loadMore();
            };
            $scope.initializeResultList();  
  }
  }
]);

