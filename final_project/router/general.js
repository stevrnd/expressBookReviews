const express = require('express');
let books = require("./booksdb.js");
//let isValid = require("./auth_users.js").isValid;
//let users = require("./auth_users.js").users;
const public_users = express.Router();

//did not see this part of the code, had a funny time with it cos i used /register in index.js lol
// public_users.post("/register", (req,res) => {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let foundBook = null;

  for(const isbn in books) {
      const book = books[isbn];
      if (book.author === author) {
          foundBook = book;
          break;
      }
  }
  if (foundBook) {
    res.send(foundBook);
  } else{
    res.status(404).send("Book not found")
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let foundBook = null;

  for(const isbn in books) {
      const book = books[isbn];
      if (book.title === title) {
          foundBook = book;
          break;
      }
  }
  if (foundBook) {
    res.send(foundBook);
  } else{
    res.status(404).send("Book not found")
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
      res.send(book.reviews);
  } else {
      res.status(404).send("book not found")
  }
});

module.exports.general = public_users;