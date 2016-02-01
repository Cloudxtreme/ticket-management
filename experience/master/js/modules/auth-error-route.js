App.config(['$stateProvider', 'RouteHelpersProvider',
function ($stateProvider, helper) {
  'use strict';

  $stateProvider
    .state('app.401', {
      url: '/401',
      title: 'Unauthorized Access Error',
      templateUrl: helper.basepath('../pages/401.html')
    });
}]);
