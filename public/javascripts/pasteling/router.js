Pasteling.router = (function() {  
  return Backbone.Router.extend({
    routes: {
      ':keySalt': 'read'
    }
  });
})();