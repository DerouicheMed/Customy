const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

  _id: Schema.Types.ObjectId,
  email: String
}, 
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;