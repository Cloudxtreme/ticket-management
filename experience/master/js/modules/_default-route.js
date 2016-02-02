App.config(['$urlRouterProvider',
function ($urlRouterProvider) {
  'use strict';

  // Default route
  $urlRouterProvider.when('/app/login', ['$state', function ($state) {
            $state.go('app.login');  
	}]).when('', ['$state', function ($state) {
            $state.go('app.login');  
			}]);

}]);
