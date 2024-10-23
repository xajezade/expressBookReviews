const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

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
  let get_books =new Promise((resolve, reject)=>{
    resolve(res.status(200).send(JSON.stringify({books}, null, 4)));
  });
  get_books.then(()=>console.log('The list of books is printed!'));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const ISBN = req.params.isbn;
  let book = JSON.stringify(books[ISBN], null,4);
  let get_book_isbn = new Promise((resolve, reject)=>{
    resolve(res.status(200).send(book));
  })
  get_book_isbn.then(()=>console.log(`the details of book with id ${ISBN} is retrieved`));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let book = Object.values(books).filter((item)=>item.author===author);
  let get_book_author = new Promise((resolve, reject)=>{
    resolve(res.status(200).send(JSON.stringify(book, null, 4)))
  });
  get_book_author.then(()=>console.log(`the details of book written by ${author} is retrieved`));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let book = Object.values(books).filter((item)=>item.title===title);
    let get_book_title = new Promise((resolve, reject)=>{
        resolve(res.status(200).send(JSON.stringify(book, null, 4)));
    });
    get_book_title.then(()=>console.log(`the details of book with title of ${title} is retrieved`));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const ISBN = req.params.isbn;
  let review = JSON.stringify(books[ISBN].reviews, null, 4);
  return res.status(200).send(review);
});

module.exports.general = public_users;
