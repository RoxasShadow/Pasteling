/*
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                    Version 2, December 2004
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */
 
var fs       = require('fs'      );
var path     = require('path'    );
var express  = require('express' );
var mongoose = require('mongoose');
var config   = require('./config');

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
fs.readdirSync('./models').forEach(function(file) {
  if(~file.indexOf('.js'))
    require('./models/' + file);
});

var routes  = require('./routes'      );
var paste   = require('./routes/paste');

var app = express();
app.set('views',       path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded());

app.get ('/api/:id/:key', paste.getJSON   );
app.post('/api/new',      paste.createJSON);

app.get ('/:id/:key',     paste.get   );
app.get ('/',             routes.index);
app.post('/',             paste.create);
app.use(app.router);

app.use(function(req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.configure('development', function() {
  app.use(function(err, req, res, next) {
    response = {
      message: err.message,
      error  : err
    };

    res.json(response);
  });
});

app.configure('production', function() {
  app.use(function(err, req, res, next) {
    response = {
      message: err.message,
      error  : {}
    };

    res.json(response);
  });
});

module.exports = app;

  