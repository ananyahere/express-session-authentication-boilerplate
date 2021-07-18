const router = require("express").Router();
const passport = require("passport");
const connection = require("../config/database");
const User = connection.models.User;
const genPassword = require("../lib/passwordUtils").genPassword;
const isAuth = require("../lib/authMiddleware").isAuth;

// POST ROUTE

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);

router.post("/register", (req, res, next) => {
  const saltHash = genPassword(req.body.pw);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.uname,
    hash,
    salt,
  });

  newUser.save().then((user) => console.log(user));

  res.redirect("/login");
});

// GET ROUTE

// Home-Page
router.get("/", (req, res, next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

// Login
router.get("/login", (req, res, next) => {
  // form
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
 Enter Username:<br><input type="text" name="uname">\
 <br>Enter Password:<br><input type="password" name="pw">\
 <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

// Register
router.get("/register", (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
  Enter Username:<br><input type="text" name="uname">\
  <br>Enter Password:<br><input type="password" name="pw">\
  <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

router.get("/protected-route", isAuth, (req, res, next) => {
  res.send(
    `You made to the protected route. <h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>`
  );
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  // res.redirect('/protected-route');
  res.send(
    `You have been sucessfully logged out. --> <a href="/login">Login again</a> `
  );
});

router.get("/login-success", (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

router.get("/login-failure", (req, res, next) => {
  res.send("You entered the wrong password.");
});

module.exports = router;
