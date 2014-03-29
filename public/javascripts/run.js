var curl;

(function() {
  curl({
    main: 'pasteling',

    packages: {
      pasteling    : { location: '/javascripts/pasteling'                              },
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
  });
}());