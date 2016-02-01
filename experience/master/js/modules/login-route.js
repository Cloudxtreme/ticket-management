App.config(['$stateProvider', 'RouteHelpersProvider',
function ($stateProvider, helper) {
  'use strict';

  $stateProvider
    .state('app.login', {
        url: '/login',
        title: 'Login',
        templateUrl: helper.basepath('../pages/login.html'),
        controller: 'loginController'
    });
}]);
