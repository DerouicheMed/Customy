const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: String,
    description: String,
    study: { type: Schema.Types.ObjectId, ref: "Study" },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
