const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  ISBN: String,
  title: String,
  author: String,
  genre: String,
  publishedYear: Date,
  quantity: Number,
});

const bookModel = mongoose.model("book", bookSchema);

module.exports = { bookModel };
