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

  this.get = function(language, callback) {
    that.langs(function(langs) {
      var fired = false;

      langs.forEach(function(lang) {
        if(lang.name.toLowerCase() == language.toLowerCase() || lang.mode == language.toLowerCase()) {
          callback(lang);
          fired = true;
        }
      });

      if(fired)
        return;
      else
        callback(null);
    })
  };
}

module.exports = CodeMirror;
