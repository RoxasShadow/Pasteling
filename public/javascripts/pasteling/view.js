Pasteling.view = (function() {
  var send = function(text, key, lang, callback) {
    if(!key.trim())
      key = Pasteling.hashing.randomString(Pasteling.config.keyLength).toString();

    if(!text.trim()) {
      alert('Paste cannot be blank.');
      return;
    }

    var post = new Pasteling.Post(text, key, '', lang);
    post.encrypt();

    $.post('/api/new', post.publicData(), function(data) {
      callback(data, post);
    });
  };

  return Backbone.View.extend({
    el: 'body',

    events: {
      'click #send': 'send'
    },

    send: function(e) {
      e.preventDefault();

      var text = Pasteling.codemirror.editor.getValue();
      var key  = $('#key').val();
      var lang = $('#langSelector').val();

      send(text, key, lang, function(data, post) {
        if(data.status == 'success')
          location.href = data.path.editor + '#!' + post.salt + '!' + post.key;
        else {
          var error = data.error.text;
          alert(error.name + ': ' + error.message);
        }
      });
    }
  });
})();