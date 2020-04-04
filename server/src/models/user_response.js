const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userResponseSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    question: { type: Schema.Types.ObjectId, ref: "Question" },
    text: String,
  },
  {
    timestamps: true,
  }
);

const UserResponse = mongoose.model("UserResponse", userResponseSchema);

module.exports = UserResponse;
