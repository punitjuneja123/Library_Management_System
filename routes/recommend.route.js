const express = require("express");
const { bookModel } = require("../model/book.model");
const { borrowedModel } = require("../model/borrowed.model");

const recommendRouter = express.Router();

recommendRouter.get("/recommendations", async (req, res) => {
  const userID = req.body.userID;
  
  // getting borrowed books details
  const borrowedBooks = await borrowedModel.find({ userID }).populate("bookID");

  // Extract book genres from borrowed books
  const genres = borrowedBooks.map((borrowedBook) => borrowedBook.bookID.genre);
  // Extract book authors from borrowed books
  const authors = borrowedBooks.map(
    (borrowedBook) => borrowedBook.bookID.author
  );

  // getting recommended books
  const recommendedBooks = await bookModel.find({
    $or: [{ genre: { $in: genres } }, { author: { $in: authors } }],
  });

  res.status(200).json(recommendedBooks);
});

module.exports = { recommendRouter };
