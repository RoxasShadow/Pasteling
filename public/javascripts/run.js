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
  },

  [
    'js!/javascripts/lib/codemirror/lib/codemirror.js',
    'js!/javascripts/lib/codemirror/addon/search/search.js',
    'js!/javascripts/lib/codemirror/addon/search/searchcursor.js',
    'js!/javascripts/lib/codemirror/addon/dialog/dialog.js',
    'js!/javascripts/lib/codemirror/addon/display/fullscreen.js',
    'js!/javascripts/lib/codemirror/mode/meta.js',

    'css!/javascripts/lib/codemirror/lib/codemirror.css',
    'css!/javascripts/lib/codemirror/theme/monokai.css',
    'css!/javascripts/lib/codemirror/addon/dialog/dialog.css',
    'css!/javascripts/lib/codemirror/addon/display/fullscreen.css'
  ]).then(function() {
    var textarea = document.getElementById('editor');
    if(textarea != null) {
      $editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers  : true,
        lineWrapping : true,
        matchBrackets: true,
        readOnly     : $readonly,
        mode         : $mode,
        theme        : 'monokai',
        extraKeys    : {
          'F11': function(cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
          },

          'Esc': function(cm) {
            if(cm.getOption('fullScreen'))
              cm.setOption('fullScreen', false);
          }
        }
      });
      $editor.setSize('100%', 700);

      var langSelector = document.getElementById('langSelector');
      if(langSelector)
        langSelector.addEventListener('change', function(a) {
          var selectedLang = this.options[this.selectedIndex].value;
          var setLang      = function() { $editor.setOption('mode', selectedLang) };

          var js = document.createElement('script');
              js.type   = 'text/javascript';
              js.src    = '/javascripts/lib/codemirror/mode/' + selectedLang + '/' + selectedLang + '.js';
              js.onload = setLang;
              js.onreadystatechange = setLang;

          document.getElementsByTagName('head')[0].appendChild(js);
        });
      
      var tabSelector = document.getElementById('tabSizeSelector')
      if(tabSelector)
        tabSelector.addEventListener('change', function(a) {
          var selectedTabSize = this.options[this.selectedIndex].value;
          $editor.setOption('tabSize', parseInt(selectedTabSize));
        });
    }
  })
}());