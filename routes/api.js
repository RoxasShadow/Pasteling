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
var CodeMirror = require('../lib/codemirror.js');

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

    res.setHeader('Content-Type', 'text/plain');
    res.end(paste.text);
  });
};

exports.getJSON = function(req, res, next) {
  Paste.load(req.params.id, function(err, paste) {
    if(err)
      return res.json({ error: err.errors });

    if(!paste)
      return next();

    paste.moment = moment;
    res.json({ paste: paste });
  });
};

function create(text, req, res) {
  new CodeMirror(path).get(req.body.lang || 'Plain Text', function(lang) {
    if(lang == null)
      return res.json({ status: 'error', error: [ 'Language not recognized.' ] });
    
    var data = {
      id  : (Math.random() + 1).toString(36).substring(8),
      text: text,
      lang: lang
    };

    var paste = new Paste(data);
    paste.save(function(err) {
      if(err)
        res.json({ status: 'error', error: err.errors });
      else {
        var url = req.protocol + '://' + req.get('host');
        var path = {
          json  : url + '/api/'      + paste.id,
          plain : url + '/api/read/' + paste.id,
          editor: url + '/'          + paste.id
        }
        res.json({ status: 'success', path: path });
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
