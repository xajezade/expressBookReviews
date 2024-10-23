const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {

}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (username && password){
    if(isValid(username)){
        users.push({"username": username, "password": password});
        return res.status(200).json({message: "User successfully registered. Now you can login"});
    }else{
        return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to resigster user: password/user is missing!"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const msg = JSON.stringify({books}, null, 4);  
  return res.status(300).send(msg);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const ISBN = req.params.isbn;
  let book = JSON.stringify(books[ISBN], null,4);
  return res.status(300).send(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let book = Object.values(books).filter((item)=>item.author===author);
  return res.status(300).send(JSON.stringify(book, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let book = Object.values(books).filter((item)=>item.title===title);
    return res.status(300).send(JSON.stringify(book, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const ISBN = req.params.isbn;
  let review = JSON.stringify(books[ISBN].reviews, null, 4);
  return res.status(300).send(review);
});

module.exports.general = public_users;
