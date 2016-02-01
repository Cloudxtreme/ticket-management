App.config(['$urlRouterProvider',
function ($urlRouterProvider) {
  'use strict';

  // Default route
  $urlRouterProvider.when('/app/Dashboard', ['$state', function ($state) {
            $state.go('app.Dashboard');  
	}]).when('', ['$state', function ($state) {
            $state.go('app.Dashboard');  
			}]);

}]);
