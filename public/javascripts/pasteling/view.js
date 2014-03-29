define(function(require) {
  var $          = require('jquery'   );
  var ciphering  = require('ciphering').useAlgorithm('aes'   );
  var hashing    = require('hashing'  ).useAlgorithm('pbkdf2');

  var config     = require('./config' );
  var Post       = require('./post'   );

  function send(text, key, lang, callback) {
    if(!key.trim())
      key = hashing.random(config.keyLength).toString();

    if(!text.trim()) {
      alert('Paste cannot be blank.');
      return;
    }

    var post = new Post(text, key, '', lang);
    post.encrypt(ciphering, hashing, config);

    $.post('/api/new', post.publicData(), function(data) {
      callback(data, post);
    });
  }

  return Backbone.View.extend({
    el: 'body',

    events: {
      'click #send': 'send'
    },

    send: function(e) {
      e.preventDefault();

      var text = $editor.getValue();
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
});