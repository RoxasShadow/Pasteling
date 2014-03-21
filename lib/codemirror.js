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

function CodeMirror(basePath, req, res) {
  this.render = function(view, options) {
    if(options === undefined)
      options = {};

    fs.readFile(basePath + '/mode/meta.js', 'utf8', function(err, data) {
      /* actually that's not safe, but json2 won't work. I pray gods I'll not be punished for this :( */
      var modes = eval(data);
          modes = modes.sort(function(a, b) {
            return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : (b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0);
          });

      options.langs = modes;
      res.render(view, options);
    });
  };
}

module.exports = CodeMirror;