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
  text     : { type: String, default: ''       },
  lang     : { type: Object, default: ''       },
  mode     : { type: String, default: ''       },
  createdAt: { type: Date,   default: Date.now }
});

PasteSchema.statics = {
  load: function(id, callback) {
    this.findOne({ id: id }).exec(callback);
  }
};

PasteSchema.path('text').required(true, 'Paste cannot be blank');

mongoose.model('Paste', PasteSchema);