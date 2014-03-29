define(function(require) {
  var Backbone = require('Backbone');
  
  return Backbone.Router.extend({
    routes: {
      ':keySalt': 'read'
    }
  });
});