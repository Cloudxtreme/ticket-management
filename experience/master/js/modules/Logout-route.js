 App.config(['$stateProvider', 'RouteHelpersProvider',
  function($stateProvider, helper) {
    'use strict';

    $stateProvider
      .state('app.Logout', {
        url: '/Logout',
        title: 'Logout',
        controller:'LogoutController',
        templateUrl: helper.basepath('')
    });
       
      
  }
]);

 
 

 