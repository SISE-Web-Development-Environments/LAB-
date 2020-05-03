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

app.get("/", (req, res) => {
  res.send("hello");
});

// app.get("/api/v1/", (req, res) => {
//   res.send("hello");
// });

app.get("/users/:first_name/:last_name", (req, res) => {
  res.send(req.params);
  // res.send(`${req.params.first_name} ${req.params.last_name} data`);
});

var usernames = [{ id: 0, name: "user0" }];

app.post("/users/addUser", (req, res) => {
  if (!req.body.name) res.status(400).send("missing username input");
  new Error();
  const username = {
    id: usernames.length + 1,
    name: req.body.name
  };
  // usernames.push(username);
  // res.status(201).send(username);
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
