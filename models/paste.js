/*
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                    Version 2, December 2004
 *
 *            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *  0. You just DO WHAT THE FUCK YOU WANT TO.
 */
 
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PasteSchema = new Schema({
  id       : { type: String, default: ''       },
  data     : { type: Object, default: {}       },
  lang     : { type: Object, default: {}       },
  createdAt: { type: Date,   default: Date.now }
});

PasteSchema.statics = {
  load: function(id, callback) {
    this.findOne({ id: id }).exec(callback);
  }
};

PasteSchema.path('data').validate(function(h) {
  return h.ct !== undefined && h.ct.length > 0;
}, 'Paste cannot be blank');

mongoose.model('Paste', PasteSchema);