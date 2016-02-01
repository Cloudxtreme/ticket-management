/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
  .constant('APP_COLORS', {
    'primary': '#5d9cec',
    'success': '#27c24c',
    'info': '#23b7e5',
    'warning': '#ff902b',
    'danger': '#f05050',
    'inverse': '#131e26',
    'green': '#37bc9b',
    'pink': '#f532e5',
    'purple': '#7266ba',
    'dark': '#3a3f51',
    'yellow': '#fad732',
    'gray-darker': '#232735',
    'gray-dark': '#3a3f51',
    'gray': '#dde6e9',
    'gray-light': '#e4eaec',
    'gray-lighter': '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
  })
  .constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
      'modernizr': ['vendor/modernizr/modernizr.js'],
      'icons': ['vendor/fontawesome/css/font-awesome.min.css',
        'vendor/simple-line-icons/css/simple-line-icons.css'
      ],
      'animo': ['vendor/animo.js/animo.js'],
      'flot-chart': ['vendor/Flot/jquery.flot.js'],
      'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
        'vendor/Flot/jquery.flot.resize.js',
        'vendor/Flot/jquery.flot.pie.js',
        'vendor/Flot/jquery.flot.time.js',
        'vendor/Flot/jquery.flot.categories.js',
        'vendor/flot-spline/js/jquery.flot.spline.min.js'
      ],
      'morris': ['vendor/raphael/raphael.js',
        'vendor/morris.js/morris.js',
        'vendor/morris.js/morris.css'
      ],
      'sparklines': ['vendor/sparklines/jquery.sparkline.min.js'],
      'loadGoogleMapsJS': ['vendor/gmap/load-google-maps.js'],
	  'angular-reverse-geocode-master' : ['vendor/angular-reverse-geocode-master/angular-reverse-geocode.js'],
	  'jquery-ui':          ['vendor/jquery-ui/ui/core.js',
                                   'vendor/jquery-ui/ui/widget.js'],
                                   // loads only jquery required modules and touch support
            'jquery-ui-widgets':  ['vendor/jquery-ui/ui/core.js',
                                   'vendor/jquery-ui/ui/widget.js',
                                   'vendor/jquery-ui/ui/mouse.js',
                                   'vendor/jquery-ui/ui/draggable.js',
                                   'vendor/jquery-ui/ui/droppable.js',
                                   'vendor/jquery-ui/ui/sortable.js',
                                   'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
            'moment' :            ['vendor/moment/min/moment-with-locales.min.js'],
            'fullcalendar':       ['vendor/fullcalendar/dist/fullcalendar.min.js',
                                   'vendor/fullcalendar/dist/fullcalendar.css'],
			'classyloader':       ['vendor/jquery-classyloader/js/jquery.classyloader.min.js'],
			 'vector-map':         ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                                   'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
      'vector-map-maps':    ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                                   'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js']
			
    },
    // Angular based script (use the right module name)
    modules: [{
        name: 'toastr',
        files: ['vendor/angularjs-toaster/toastr.js',
          'vendor/angularjs-toaster/toastr.css'
        ]
      }, {
        name: 'datatables',
        files: ['vendor/datatables/media/css/jquery.dataTables.css',
          'vendor/datatables/media/js/jquery.dataTables.js',
          'vendor/angular-datatables/dist/angular-datatables.js'
        ],
        serie: true
      }, {
        name: 'bubbletree',
        files: ['vendor/bubbletree/jquery/jquery.js',
          'vendor/bubbletree/jquery/jquery.min.js',
          'vendor/bubbletree/jquery/jquery.min.map',
          'vendor/bubbletree/jquery/jquery.history.js',
          'vendor/bubbletree/raphael.js',
          'vendor/bubbletree/vis4.js',
          'vendor/bubbletree/Tween.js',
          'vendor/bubbletree/bubbletree.js',
          'vendor/bubbletree/bubbletree.css',
          'vendor/bubbletree/styles/cofog.js'
        ],
        serie: true
      }, {
        name: 'ui-iconpicker',
        files: ['vendor/ui-iconpicker/ui-iconpicker.js',
          'vendor/ui-iconpicker/ui-iconpicker.min.js',
          'vendor/ui-iconpicker/styles/ui-iconpicker.css',
          'vendor/ui-iconpicker/styles/ui-iconpicker.min.css'
        ]
      }, {
        name: 'localytics.directives',
        files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
          'vendor/chosen_v1.2.0/chosen.min.css',
          'vendor/angular-chosen-localytics/chosen.js'
        ]
      }, {
        name: 'ui.map',
        files: ['vendor/angular-ui-map/ui-map.js']
      },
	  {name: 'ngDialog',                  files: ['vendor/ngDialog/js/ngDialog.min.js',
                                                 'vendor/ngDialog/css/ngDialog.min.css',
                                                 'vendor/ngDialog/css/ngDialog-theme-default.min.css'],
         'classyloader':       ['vendor/jquery-classyloader/js/jquery.classyloader.min.js']                                      
       }

    ]

  });
