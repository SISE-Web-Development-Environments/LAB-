var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(cookieParser()); //Parse the cookies into the req.cookies
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

var port = process.env.PORT || "3000";

const db = require("./db");

// const db = [
//   {
//     id: 0,
//     name: "eran",
//     password: "12345",
//     nickname: "e",
//     data: "yyut"
//   },
//   {
//     id: 1,
//     name: "liad",
//     password: "568",
//     nickname: "e",
//     data: "yyut"
//   }
// ];

app.post("/users/Register", (req, res) => {
  // parameters exists
  // valid parameters
  // username exists
  if (db.find((x) => x.name === req.body.name)) throw new Error("Name exists");
  // add the new username
  var newUser = { ...req.body, id: db.length };
  db.push(newUser);
  res.status(201).send("ok");
  // db.push(req.body)
});

app.post("/users/Login", (req, res) => {
  // check that username exists
  if (!db.find((x) => x.name === req.body.name))
    throw new Error("Name is not exists");
  // check that the password is correct
  var user = db.find((x) => x.name === req.body.name);
  if (req.body.password !== user.password) {
    throw new Error("password incorrect");
  }
  //create cookie
  var cookie = "cookie";
  res.status(200).send(cookie);
  // return cookie
});

app.get("/", (req, res) => {
  res.send("hello");
});

// app.get("/api/v1/", (req, res) => {
//   res.send("hello");
// });

app.get("/users/:first_name/:last_name", (req, res) => {
  res.send("1234");
  // res.send(`${req.params.first_name} ${req.params.last_name} data`);
});

var usernames = [{ id: 0, name: "user0" }];

app.post("/users/addUser", (req, res) => {
  console.log(usernames);
  if (!req.body.name) {
    throw new Error("missing username input");
  }
  const username = {
    id: usernames.length,
    name: req.body.name
  };
  usernames.push(username);
  console.log(usernames);
  res.status(201).send(username);
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
