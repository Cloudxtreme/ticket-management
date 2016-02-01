App.config(['$stateProvider', 'RouteHelpersProvider',
  function($stateProvider, helper) {
    'use strict';

    $stateProvider
      .state('app.CreateTicket', {
        url: '/CreateTicket',
        title: 'CreateTicket',
		controller:'CreateTicketController',
        templateUrl: helper.basepath('CreateTicket.html'),
        resolve: angular.extend(helper.resolveFor('ngDialog'),{

            tpl: function() { return { path: helper.basepath('') }; }
             })
      });
  }
]);
