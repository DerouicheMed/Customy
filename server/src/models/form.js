const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: String,
    description: String,
    publishedAt : Date,
    expiresAt : Date,
    allowAnonymous : Boolean,
    study: { type: Schema.Types.ObjectId, ref: "Study" },
    questions : []
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
