define(function(require) {
  var Backbone   = require('Backbone' );
  var $          = require('jquery'   );

  var AppView    = require('./view'   );
  var AppRouter  = require('./router' );
  var Post       = require('./post'  );
  var config     = require('./config');
  
  var ciphering  = require('ciphering').useAlgorithm(config.ciphering);
  var hashing    = require('hashing'  ).useAlgorithm(config.hashing  );

  new AppView();
  var router = new AppRouter;

  router.on('route:read', function(keySalt) {
    keySalt = keySalt.split('!');

    var text = $editor.getValue();
    var key  = keySalt.pop();
    var salt = keySalt.pop();
    var lang = $('#editor').data('lang');

    var post = new Post(text, key, salt, lang);
    post.decrypt(ciphering, hashing, config);

    $editor.setValue(!!post.text.trim() ? post.text : 'Invalid key or salt.');
  });

  Backbone.history.start();
});