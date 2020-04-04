const mongoose = require("mongoose");
const Response = require("./response").schema;
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  text: String,
  type: String,
  file: String,
  form: { type: Schema.Types.ObjectId, ref: "Form" },
  responses: [Response],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
