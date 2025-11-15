// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Server start and mongoose connection
app.listen(5000, async () => {
  console.log("Server running on port 5000");
  await mongoose.connect("mongodb://mongo-service:27017/bookverse"); //mongo connection for mongo pod service with the name "mongo-service"
  console.log("Mongo Connection successful");
});

// Mongoose model
const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      trim: true,
      required: true,
    },
  })
);

// API routes

app.get("/api/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post("/api/books", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

app.delete("/api/books/:id", async(req, res) => {
    let {id} = req.params;
    Book.findByIdAndDelete(id)
        .then((result) => {
            res.status(200).send("Deleted successfully");
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});