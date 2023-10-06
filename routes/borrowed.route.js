const express = require("express");
const { borrowedModel } = require("../model/borrowed.model");

const borrowedRouter = express.Router();

// borrow a book by Book_Id
borrowedRouter.post("/borrow/:bookID", async (req, res) => {
  let bookID = req.params.bookID;
  let userID = req.body.userID;
  try {
    let allBooks = await borrowedModel.find();
    let borrowedBooks = allBooks.filter((item) => {
      return item.status == "borrowed";
    });
    console.log(borrowedBooks.length);
    if (borrowedBooks.length < 3) {
      let saveData = borrowedModel({ bookID, userID });
      await saveData.save();
      res.status(201).send({ msg: "borrowed a book" });
    } else {
      res.status(400).send({ msg: "you cant borrow more then 3 books" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
});

// return a book
borrowedRouter.post("/return/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await borrowedModel.findByIdAndUpdate({ _id: id }, { status: "returned" });
    res.send({ msg: "book returned" });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
});

module.exports = { borrowedRouter };
