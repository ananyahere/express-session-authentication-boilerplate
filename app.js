// Starting file
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const session = require("express-session");
const connection = require("./config/database");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);

require('dotenv').config()

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET_MESSAGE,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(5000, () => {
  console.log("Server is up at port 5000");
});
