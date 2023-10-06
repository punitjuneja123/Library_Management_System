const mongoose = require("mongoose");

const borrowedSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    bookID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  {
    timestamps: true,
  }
);

const borrowedModel = mongoose.model("borrowed", borrowedSchema);

module.exports = { borrowedModel };
