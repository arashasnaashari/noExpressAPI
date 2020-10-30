//controll data
const Book = require("../models/bookModel");
const { getPostsData } = require("../utils");
// get All
// GET /api/products
async function getBooks(req, res) {
  try {
    const books = await Book.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (error) {
    console.log(error);
  }
}

// get single
// GET /api/products/:id
async function getBook(req, res, id) {
  try {
    const book = await Book.findById(id);

    if (!book) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ msg: "not find" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(book));
    }
  } catch (error) {
    console.log(error);
  }
}

// create book
// POST /api/products
async function createBook(req, res) {
  try {
    const body = await getPostsData(req);
    const { name } = JSON.parse(body);
    const book = {
      name,
    };
    const newBook = await Book.create(book);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newBook));
  } catch (error) {
    console.log(error);
  }
}

// update book
// PUT /api/products/:id
async function updateBook(req, res, id) {
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ msg: "not find" }));
    } else {
      const body = await getPostsData(req);
      const { name } = JSON.parse(body);
      const bookData = {
        name: name || book.name,
      };
      const updBook = await Book.update(id, bookData);

      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updBook));
    }
  } catch (error) {
    console.log(error);
  }
}

// delete book
// DELETE /api/products/:id
async function removeBook(req, res, id) {
  try {
    const book = await Book.findById(id);

    if (!book) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ msg: "not find" }));
    } else {
      await Book.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ msg: "book removed !" }));
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  removeBook,
};
