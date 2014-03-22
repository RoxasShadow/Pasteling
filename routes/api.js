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

exports.langs = function(req, res, next) {
  new CodeMirror(path, req, res).langs(function(modes) {
    res.json({ langs: modes });
  });
};

exports.get = function(req, res, next) {
  Paste.load(req.params.id, function(err, paste) {
    if(err)
      return res.json({ error: err.errors });

    if(!paste)
      return next();

    paste.moment = moment;
    paste.text   = security.decrypt(paste.text, req.params.key);
    res.json({ paste: paste });
  });
};

exports.create = function(req, res) {
  var key = req.body.key && req.body.key.trim() != '' ? req.body.key : Math.random().toString(36).substring(config.keyLength);

  new CodeMirror(path, req, res).get(req.body.lang || 'Plain Text', function(lang) {
    if(lang == null)
      return res.json({ status: 'error', error: [ 'Language not recognized.' ] });

    var data = {
      id  : (Math.random() + 1).toString(36).substring(8),
      text: req.body.text && req.body.text.trim() != '' ? security.encrypt(req.body.text, key) : '',
      lang: lang
    };

    var paste = new Paste(data);
    paste.save(function(err) {
      if(err)
        res.json({ status: 'error',   error: err.errors                  });
      else
        res.json({ status: 'success', path:   '/' + paste.id + '/' + key });
    });
  });
};