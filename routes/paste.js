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

var Paste = mongoose.model('Paste');

exports.get = function(req, res, next) {
  Paste.load(req.params.id, function(err, paste) {
    if(err)
      return res.render('paste', {
        error: err.errors
      });

    if(!paste)
      return next();

    paste.moment = moment;
    res.render('paste', { paste: paste });
  });
};