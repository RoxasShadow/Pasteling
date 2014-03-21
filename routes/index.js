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

exports.index = function(req, res) {
  var path = 'public/javascripts/lib/codemirror';
  new CodeMirror(path, req, res).render('index');
};