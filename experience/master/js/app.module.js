/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS Material
 * 
 * Version: 3.0.0
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 
/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

// APP START
// ----------------------------------- 

var App = angular.module('angle', [
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'ngCookies',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ngSanitize',
    'ngResource',
    'ui.utils'
  ]);

App.run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', function ($rootScope, $state, $stateParams, $window, $templateCache) {
    // Set reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $window.localStorage;

    // Uncomment this to disable template cache
    /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (typeof(toState) !== 'undefined'){
          $templateCache.remove(toState.templateUrl);
        }
    });*/

    // Scope Globals
    // ----------------------------------- 
    $rootScope.app = {
      name: 'EDT App Creation Tool',
      description: 'EDT App Creation Tool',
      year: ((new Date()).getFullYear()),
      layout: {
        isFixed: true,
        isCollapsed: false,
        isBoxed: false,
        isRTL: false,
        horizontal: false,
        isFloat: false,
        asideHover: false,
        theme: null
      },
      useFullLayout: false,
      hiddenFooter: false,
      viewAnimation: 'ng-fadeInUp'
    };
    $rootScope.user = {
      name:     'John',
      job:      'ng-developer',
      picture:  'app/img/user/02.jpg'
    };

}]);

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.maps',
            'app.utils',
            'app.material'
        ]);
})();


(function() {
    'use strict';

    angular
        .module('ngAria', []);
})();

(function() {
    'use strict';

    angular
        .module('ngMessages', []);
})();


(function() {
    'use strict';

    angular
        .module('ngMaterial', []);
})();

(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();