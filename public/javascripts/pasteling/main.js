Pasteling.main = (function() {
  var setup = function() {
    Pasteling.ciphering.useAlgorithm(Pasteling.config.algorithms.ciphering);
    Pasteling.hashing  .useAlgorithm(Pasteling.config.algorithms.hashing  );

    Pasteling.codemirror.setup();
    new Pasteling.view();

    var router = new Pasteling.router();
    router.on('route:read', function(keySalt) {
      keySalt = keySalt.split('!');

      var editor = Pasteling.codemirror.editor;

      var text = editor.getValue();
      var key  = keySalt.pop();
      var salt = keySalt.pop();
      var lang = $('#editor').data('lang');

      try {
        var post = new Pasteling.Post(text, key, salt, lang);
        post.decrypt();
        editor.setValue(!!post.text.trim() ? post.text : 'Invalid key or salt.');
      }
      catch(err) {
        editor.setValue('Invalid key or salt.');
      }
    });

    Backbone.history.start();
  };

  return {
    setup: setup
  };
})();