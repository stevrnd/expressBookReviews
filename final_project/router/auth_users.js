const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        return true;
      } else {
        return false;
      }
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(users)
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
    
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
  
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("Customer successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const reviewText = req.params.review
    const isbn = req.params.isbn;
    const username = req.session.username;

    // Check if the book exists
    if (!books[isbn]) {
        res.status(404).send('Book not found');
        return;
    }
    // Check if the user has already reviewed the book
    if (books[isbn].reviews[username]) {
        // Modify existing review
        books[isbn].reviews[username] = reviewText;
        return res.status(200).json({message: "Review for the book with ISBN "+ isbn +" has been added/updated"});
    } else {
        // Add a new review
        books[isbn].reviews[username] = reviewText;
        return res.status(200).json({message: "Review for the book with ISBN "+ isbn+ " has been added/updated"});
    }
});

//delete book review
regd_users.delete("/auth/review/:isbn", (req, res) => {

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
