App.config(['$stateProvider', 'RouteHelpersProvider',
  function($stateProvider, helper) {
    'use strict';

    $stateProvider
      .state('app.PendingRequest', {
        url: '/PendingRequest',
        title: 'PendingRequest',
		controller:'PendingRequestController',
        templateUrl: helper.basepath('PendingRequest.html'),
        resolve: helper.resolveFor('datatables', 'sparklines', 'jquery-ui', 'jquery-ui-widgets', 'classyloader', 'moment', 'fullcalendar', 'flot-chart', 'flot-chart-plugins', 'morris', 'toastr', 'loadGoogleMapsJS', function() {
          return loadGoogleMaps();
        }, 'ui.map', 'angular-reverse-geocode-master','vector-map', 'vector-map-maps'),
        isRestricted: 'true'
      });
  }
]);
