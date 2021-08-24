const express = require('express');
const path = require('path');
const cookieParser = require ('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('express-flash');
const passport = require('passport');
const nunjucks = require('nunjucks');
const Pool = require('pg-pool');
const initPassport = require('./passport-config');

const port = 9000;

// connect to postgres
const pool = new Pool({
	user: 'sprint',
	host: 'localhost',
	database: "animaldb",
	password: "password",
	port: 5432
});

// Get user email in database
const getUserByEmail = async (email) => {
  const results = await pool.query('SELECT * FROM users where email = $1', [email]);
  if(results.rows.length === 1) {
    return results.rows[0];
  }else{
    return null;
  }
};
// Get user id in database
const getUserById = async (userid) => {
  const results = await pool.query("SELECT * FROM users WHERE userid = $1", [userid]);
  if(results.rows.length === 1) {
    return results.rows[0];
  }else{
    return null;
  }
};

// initialize passport
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

// setting up middlewares
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

// Authenticate user
const checkSignedIn = (req, res, next) => {
  if(req.isAuthenticated()) { 
      return next(); 
  }
  res.redirect('/signin'); 
};

// check if user is signed in
const checkNotSignedIn = (req, res, next) => {
  if(req.isAuthenticated()) { 
      return res.redirect('/'); 
  }
  next(); 
};

// set up routes and pass in middlewares
app.use('/', indexRouter);
app.use('/signup', checkNotSignedIn, signupRouter);
app.use('/signin', checkNotSignedIn, signinRouter);
app.use('/signout', checkSignedIn, signoutRouter);
app.use('/search', checkSignedIn, searchRouter);
app.use('/submit', submitRouter);

app.listen(9000, () => {
	console.log(`Listening on http://localhost:${port}`);
});
