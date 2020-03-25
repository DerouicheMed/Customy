const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const responseSchema = new Schema({

  _id: Schema.Types.ObjectId,
  text: String,
  image: String,
  question:{type: Schema.Types.ObjectId,ref: 'Question'},
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;