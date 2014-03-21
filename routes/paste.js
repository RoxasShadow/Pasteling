/*
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                    Version 2, December 2004
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */

var mongoose   = require('mongoose'            );
var moment     = require('moment'              );
var config     = require('../config.js'        );
var Security   = require('../lib/security.js'  );
var CodeMirror = require('../lib/codemirror.js');

var algorithm = require('../lib/algorithms/' + config.algorithm);
var security  = new Security(new algorithm());

var Paste = mongoose.model('Paste');
var path  = 'public/javascripts/lib/codemirror';

exports.get = function(req, res, next) {
  Paste.load(req.params.id, function(err, paste) {
    if(err)
      return res.render('paste', {
        error: err.errors
      });

    if(!paste)
      return next();

    paste.moment = moment;
    paste.text   = security.decrypt(paste.text, req.params.key);

    new CodeMirror(path, req, res).render('paste', { paste: paste });
  });
};

exports.getJSON = function(req, res, next) {
  Paste.load(req.params.id, function(err, paste) {
    if(err)
      return res.json('paste', {
        error: err.errors
      });

    if(!paste)
      return next();

    paste.moment = moment;
    paste.text   = security.decrypt(paste.text, req.params.key);

    res.json('paste', { paste: paste });
  });
};

exports.create = function(req, res) {
  var denied = req.body.text.trim() == '';
  var key    = req.body.key && req.body.key.trim() != '' ? req.body.key : Math.random().toString(36).substring(config.keyLength);
  
  var data = {
    id  : (Math.random() + 1).toString(36).substring(8),
    text: denied ? '' : security.encrypt(req.body.text, key),
    lang: req.body.lang || 'plain/text'
  };

  var paste = new Paste(data);

  paste.save(function(err) {
    if(err)
      new CodeMirror(path, req, res).render('index', { error: err.errors });
    else
      res.redirect('/' + paste.id + '/' + key);
  });
};