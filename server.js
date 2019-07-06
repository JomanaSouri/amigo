const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const User = require("./models/User");
const mongoose = require("mongoose");

const db =
  "mongodb+srv://Jomana:joma@cluster0-o3byw.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(db, {})
  .then(() => console.log("Db Connected"))
  .catch(err => console.log(err));

// Body parser middleware
app.use(express.urlencoded());

/* GET home page. */
app.get("/", (req, res) =>
  res.json({
    msg: "Hello! Jomana"
  })
);

app.post("/users", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(""));
});

app.post("/users", (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err));
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
