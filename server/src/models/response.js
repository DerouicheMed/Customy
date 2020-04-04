const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema({
  text: String,
  file: String,
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
