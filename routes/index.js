/*
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                    Version 2, December 2004
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */

var CodeMirror = require('../lib/codemirror.js');
var package    = require('../package.json'     );

var path = 'public/javascripts/lib/codemirror';

exports.index = function(req, res) {
  new CodeMirror(path).langs(function(langs) {
    res.render('index', { langs: langs, version: package.version });
  });
};