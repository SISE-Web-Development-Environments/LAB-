var express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

const port = process.env.PORT || 3000; //environment variable
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
