var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var quibbleModel = new Schema({
  id: { type: Number },
  text: { type: String },
  category: { type: String },
  like: { type: Boolean, default: false }
});

module.exports = mongoose.model('Quibble', quibbleModel);
