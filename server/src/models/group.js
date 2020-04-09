const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name : String,
    users : [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
