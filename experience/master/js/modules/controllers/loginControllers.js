/**
 * ========================================================= Module:
 * loginController.js Main Application Controller
 * =========================================================
 */
App.controller('loginController', ['$rootScope', '$scope',
    '$state',
    '$http',
    '$sessionStorage','restTemplate',
    function($rootScope, $scope, $state, $http, $sessionStorage,restTemplate) {
        $scope.title = 'Login';
        $scope.login = {
            submit: function() {
			  var loginPayload =  { 'username': $scope.account.email,
								    'password': $scope.account.password
								  };
			  var headers = {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json, text/plain, */*'
                            }
              restTemplate.execute('','http://localhost:8080/api/v1/auth',loginPayload, headers)
                .then(function(data) {
                  // set the sessionStorage
                  $sessionStorage.token = data.token;
                  $sessionStorage.username = data.username;

                  // redirect user to default route
                  $state.go('app.Dashboard');
                },function(data, status, config) {
                  $scope.authMsg = 'Server Request Error';
                  $state.go('app.401');
                });
            }
        };
    }
]);