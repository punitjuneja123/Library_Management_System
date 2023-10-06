const express = require("express");
const { bookModel } = require("../model/book.model");

const bookRouter = express.Router();

// adding a book
bookRouter.post("/book/add", async (req, res) => {
  let payload = req.body;
  // converting string(yyyy-mm-dd) to date format
  payload.publishedYear = new Date(payload.publishedYear);

  try {
    let addData = bookModel(payload);
    await addData.save();
    res.status(201).send({ msg: "book added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
});

// getting all books
bookRouter.get("/book", async (req, res) => {
  try {
    let allBookData = await bookModel.find();
    res.send(allBookData);
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
});

// getting a book by id
bookRouter.get("/book/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let bookData = await bookModel.findOne({ _id: id });
    res.send(bookData);
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
});

// updating book details
bookRouter.patch("/book/:id/update", async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  try {
    await bookModel.findByIdAndUpdate({ _id: id }, payload);
    res.send({ mag: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
});

// deleting book
bookRouter.delete("/book/:id/delete", async (req, res) => {
  let id = req.params.id;
  try {
    await bookModel.findByIdAndDelete({ _id: id });
    res.send({ mag: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
});

// search functionality
bookRouter.get("/book/search/:query", async (req, res) => {
  let query = req.params.query;
  let searchData = await bookModel.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { author: { $regex: query, $options: "i" } },
      { ISBN: { $regex: query, $options: "i" } },
    ],
  });
  res.send(searchData);
});

module.exports = { bookRouter };
