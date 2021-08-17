const express = require('express');
const pkg = require ('pg');
const path = require('path');
const cookieParser = require ('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('express-flash');
const passport = require('passport');
const { MongoClient } = require('mongodb');
const nunjucks = require('nunjucks');
const passportLocal = require('passport-local');
const Pool = require('pg-pool');
const { fileURLToPath } = require('url');
const initPassport = require('./passport-config');

const port = 9000;

const pool = new Pool({
	user: 'sprint',
	host: 'localhost',
	database: "animaldb",
	password: "password",
	port: 5432
});

const getUserByEmail = async (email) => {
  //return global.registeredUsers.find(user => user.name === name);
  //return animaldb.registeredUsers.find(user => user.email === email);
  // Write a query call to the databse that returns the user with the given email
  const results = await pool.query('SELECT * FROM users where email = $1', [email]);
  // Check to see how many rows were returned.
  //If one, perfect, return the object representing that row.
  //If none, return null or something.
 
  if(results.rows.length === 1) {
    return results.rows[0];
  }else{
    return null;
  }
};

const getUserById = async (userid) => {
  //return global.registeredUsers.find(user => user.id === id);
  const results = await pool.query("SELECT * FROM users WHERE userid = $1", [userid]);

  if(results.rows.length === 1) {
    return results.rows[0];
  }else{
    return null;
  }
};

initPassport(passport, getUserByEmail, getUserById);

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');
const signoutRouter = require('./routes/signout');
const searchRouter = require('./routes/search');
const submitRouter = require('./routes/submit');

const app = express();

nunjucks.configure('views', {
  noCache: true,
  autoescape: true,
  express: app
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'unsafe value',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(flash());



const checkSignedIn = (req, res, next) => {
  if(req.isAuthenticated()) { // if they are signed in
      return next(); // proceed to next middleware
  }
  res.redirect('/signin'); // else, redirect them to the signin page
};

const checkNotSignedIn = (req, res, next) => {
  if(req.isAuthenticated()) { // if they are signed in
      return res.redirect('/'); // send them to the home page since they are signed in
  }
  next(); // else, allow them to visit the page they want to
};


app.use('/', indexRouter);
app.use('/signup', checkNotSignedIn, signupRouter);
app.use('/signin', checkNotSignedIn, signinRouter);
app.use('/signout', checkSignedIn, signoutRouter);
app.use('/search', checkSignedIn, searchRouter);
app.use('/submit', submitRouter);







app.listen(9000, () => {
	console.log(`Listening on http://localhost:${port}`);
});
