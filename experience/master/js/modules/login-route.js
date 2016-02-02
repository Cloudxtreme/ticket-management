App.config(['$stateProvider', 'RouteHelpersProvider',
function ($stateProvider, helper) {
  'use strict';

  $stateProvider
    .state('app.login', {
        url: '/login',
        title: 'Login',
        templateUrl: helper.basepath('LoginPage.html'),
        controller: 'LoginFormController'
    });
}]);
