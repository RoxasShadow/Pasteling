var curl;

(function() {
  curl(
    {
      preloads: [
        'js!/javascripts/lib/codemirror/lib/codemirror.js',
        'js!/javascripts/lib/codemirror/addon/search/search.js',
        'js!/javascripts/lib/codemirror/addon/search/searchcursor.js',
        'js!/javascripts/lib/codemirror/addon/dialog/dialog.js',
        'js!/javascripts/lib/codemirror/addon/display/fullscreen.js',
        'js!/javascripts/lib/codemirror/mode/meta.js',

        'css!/javascripts/lib/codemirror/lib/codemirror.css',
        'css!/javascripts/lib/codemirror/theme/monokai.css',
        'css!/javascripts/lib/codemirror/addon/dialog/dialog.css',
        'css!/javascripts/lib/codemirror/addon/display/fullscreen.css',

        'css!/stylesheets/style.css'
      ],

      packages: {
        curl         : { location: '/javascripts/lib/curl/src/curl'                      },
        jquery       : { location: '/javascripts/lib/jquery/jquery',           main: '.' },
        Backbone     : { location: '/javascripts/lib/backbone-amd/backbone',   main: '.' },
        underscore   : { location: '/javascripts/lib/lodash/lodash',           main: '.' },
        ciphering    : { location: '/javascripts/algorithms/ciphering',        main: '.' },
        hashing      : { location: '/javascripts/algorithms/hashing',          main: '.' },

        pbkdf2: {
          location: '/javascripts/lib/crypto-js/rollups',
          main    : 'pbkdf2',
          config  : { loader: 'curl/loader/legacy', exports: 'CryptoJS' }
        },
        
        aes: {
          location: '/javascripts/lib/crypto-js/rollups',
          main    : 'aes',
          config  : { loader: 'curl/loader/legacy', exports: 'CryptoJS' }
        }
      }
    },

    [
      'js!/javascripts/pasteling/codemirror',
      '/javascripts/pasteling/main'

    ]
  );
}());