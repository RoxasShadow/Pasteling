/*
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                    Version 2, December 2004
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */

var fs         = require('fs'                  );
var mongoose   = require('mongoose'            );
var moment     = require('moment'              );
var config     = require('../config.js'        );
var Security   = require('../lib/security.js'  );
var CodeMirror = require('../lib/codemirror.js');

var algorithm = require('../lib/algorithms/' + config.algorithm);
var security  = new Security(new algorithm());

var Paste = mongoose.model('Paste');
var path  = 'public/javascripts/lib/codemirror';

exports.langs = function(req, res, next) {
  new CodeMirror(path).langs(function(modes) {
    res.json({ langs: modes });
  });
};

exports.get = function(req, res, next) {
  Paste.load(req.params.id, function(err, paste) {
    if(err)
      return res.json({ error: err.errors });

    if(!paste)
      return next();

    var hash = security.hash(req.params.key, paste.salt, req.params.key.length, config.iterations);

    res.setHeader('Content-Type', 'text/plain');
    res.end(security.decrypt(paste.text, hash.key).toString());
  });
};

exports.getJSON = function(req, res, next) {
  Paste.load(req.params.id, function(err, paste) {
    if(err)
      return res.json({ error: err.errors });

    if(!paste)
      return next();

    var hash = security.hash(req.params.key, paste.salt, req.params.key.length, config.iterations);

    paste.moment = moment;
    paste.text   = security.decrypt(paste.text, hash.key);
    paste.salt   = undefined;
    res.json({ paste: paste });
  });
};

function create(text, req, res) {
  var key = req.body.key && !!req.body.key.trim() ? req.body.key : security.randomKey(config.keyLength / 2);

  if(!/^[a-zA-Z0-9]+$/.test(key))
    return res.json({ status: 'error', error: [ 'Invalid key format.' ] });

  new CodeMirror(path).get(req.body.lang || 'Plain Text', function(lang) {
    if(lang == null)
      return res.json({ status: 'error', error: [ 'Language not recognized.' ] });
    
    var hash = security.hash(key, '', key.length, config.iterations);
    var data = {
      id  : (Math.random() + 1).toString(36).substring(8),
      text: !text || !text.trim() ? '' : security.encrypt(text, hash.key),
      salt: hash.salt,
      lang: lang
    };

    var paste = new Paste(data);
    paste.save(function(err) {
      if(err)
        res.json({ status: 'error', error: err.errors });
      else {
        var url = req.protocol + '://' + req.get('host');
        res.json({ status: 'success', path: url + '/api/' + paste.id + '/' + key });
      }
    });
  });
}

exports.create = function(req, res) {
  if(req.files.text)
    fs.readFile(req.files.text.path, function(err, text) {
      create(text.toString(), req, res);
      fs.unlink(req.files.text.path);
    });
  else
    create(req.body.text, req, res);
};
