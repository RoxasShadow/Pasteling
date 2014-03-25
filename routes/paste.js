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

    var hash = security.hash(req.params.key, paste.salt, req.params.key.length, config.iterations);

    paste.moment = moment;
    paste.text   = security.decrypt(paste.text, hash.key);
    paste.salt   = undefined;
    res.render('paste', { paste: paste, key: hash.key });
  });
};

exports.create = function(req, res) {
  var key = req.body.key && !!req.body.key.trim() ? req.body.key : security.randomKey(config.keyLength / 2);

  if(!/^[a-zA-Z0-9]+$/.test(key))
    return codemirror.langs(function(langs) {
      res.render('index', { error: [ 'Invalid key format.' ], langs: langs });
    });

  var hash       = security.hash(key, '', key.length, config.iterations);
  var codemirror = new CodeMirror(path);

  codemirror.get(req.body.lang || 'Plain Text', function(lang) {
    if(lang == null)
      return codemirror.langs(function(langs) {
        res.render('index', { error: [ 'Language not recognized.' ], langs: langs });
      });
    
    var data = {
      id  : (Math.random() + 1).toString(36).substring(8),
      text: req.body.text && !!req.body.text.trim() ? security.encrypt(req.body.text, hash.key) : '',
      salt: hash.salt,
      lang: lang
    };

    var paste = new Paste(data);
    paste.save(function(err) {
      if(err)
        codemirror.langs(function(langs) {
          res.render('index', { error: err.errors, langs: langs });
        });
      else
        res.redirect('/' + paste.id + '/' + key);
    });
  });
};