/**
 * 
 */

App.factory('restTemplate', ['$http', '$q', '$rootScope', '$sessionStorage','$state',
	function($http, $q, $rootScope, $sessionStorage, $state) {
		var serviceFactory = {};

		serviceFactory.execute = function(method, endpoint, payload, header) {

			var httpRequest = null;
			var response = $q.defer();
			
			var isRestricted = false;
			// common code to override header for restricted applications to use Authorization header
			if (isRestricted && !header) {
			  var token = $sessionStorage.token;
			  if (!token) {
				console.log("User is not logged in");
				$state.go('app.login');
			  }
			  header = {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				"Authorization": "Bearer " + token
			  };
			}
			//Prepare rest header options 
			var httpOptions = {
				method: method,
				url: endpoint,
				data: payload             		
			};
			if(header){
				httpOptions.header = header;
			}
			
			//Perform rest call
			httpRequest =  $http(httpOptions)
			.then(function(data) {
				response.resolve(data.data);
			}, function(data, status, config) {
				response.reject(data, status, config);
			})

			return response.promise;
		};

		return serviceFactory;
	}
]);