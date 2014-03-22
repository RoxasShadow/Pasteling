/*
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                    Version 2, December 2004
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */

var fs = require('fs');

function CodeMirror(basePath) {
  var that = this;

  this.langs = function(callback) {
    fs.readFile(basePath + '/mode/meta.js', 'utf8', function(err, data) {
      var modes = eval(data);
          modes = modes.sort(function(a, b) {
            return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : (b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0);
          });

      callback(modes);
    });
  };

  this.get = function(lang, callback) {
    that.langs(function(modes) {
      modes.forEach(function(mode) {
        if(mode.name.toLowerCase() == lang.toLowerCase()) {
          callback(mode);
          callback = null;
        }
      });

      if(callback)
        callback(null);
    })
  };
}

module.exports = CodeMirror;