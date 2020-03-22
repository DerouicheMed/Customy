const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studySchema = new Schema({

  _id: Schema.Types.ObjectId,
  name: String,
  forms:[{type: Schema.Types.ObjectId,ref: 'Form'}],
}, 
{
  timestamps: true,
});

const Study = mongoose.model('Study', studySchema);

module.exports = Study;