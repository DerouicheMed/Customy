const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({

  _id: Schema.Types.ObjectId,
  text: String,
  type: String,
  image: String,
  form:{type: Schema.Types.ObjectId,ref: 'Form'},
  reponses:[{type: Schema.Types.ObjectId,ref: 'Response'}]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;