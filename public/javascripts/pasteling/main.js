Pasteling.main = (function() {
  var setup = function() {
    Pasteling.ciphering.useAlgorithm(Pasteling.config.algorithms.ciphering);
    Pasteling.hashing.useAlgorithm(Pasteling.config.algorithms.hashing);

    Pasteling.hashing.setup();
    Pasteling.codemirror.setup();
    new Pasteling.view();

    var router = new Pasteling.router();
    router.on('route:read', function(keySalt) {
      keySalt = keySalt.split('!');

      var editor = Pasteling.codemirror.editor;

      var data = JSON.parse(editor.getValue());
      var key  = keySalt.pop();
      var salt = keySalt.pop();
      var lang = $('#editor').data('lang');

      try {
        var post = new Pasteling.Post(data, key, salt, lang);
        post.decrypt();
        editor.setValue(!!post.data.text.trim() ? post.data.text : 'Invalid key or salt.');
      }
      catch(err) {
        console.log(err)
        editor.setValue('Invalid key or salt.');
      }
    });

    Backbone.history.start();
  };

  return {
    setup: setup
  };
})();