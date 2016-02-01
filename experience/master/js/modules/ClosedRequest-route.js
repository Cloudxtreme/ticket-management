App.config(['$stateProvider', 'RouteHelpersProvider',
  function($stateProvider, helper) {
    'use strict';

    $stateProvider
      .state('app.ClosedRequest', {
        url: '/ClosedRequest',
        title: 'ClosedRequest',
		controller:'ClosedRequestController',
        templateUrl: helper.basepath('ClosedRequest.html'),
        resolve: helper.resolveFor('datatables', 'sparklines', 'jquery-ui', 'jquery-ui-widgets', 'classyloader', 'moment', 'fullcalendar', 'flot-chart', 'flot-chart-plugins', 'morris', 'toastr', 'loadGoogleMapsJS', function() {
          return loadGoogleMaps();
        }, 'ui.map', 'angular-reverse-geocode-master','vector-map', 'vector-map-maps'),
        isRestricted: 'true'
      });
  }
]);
