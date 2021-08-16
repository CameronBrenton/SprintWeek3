/*import express, { json } from 'express';
import pkg from 'pg';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import methodOverride from 'method-override';
import flash from 'express-flash';
import passport from 'passport';
import { MongoClient } from 'mongodb';
import nunjucks from 'nunjucks';
import passportLocal from 'passport-local';
import Pool from 'pg-pool';
import route from 'router'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import initPassport from '../passport-config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
*/


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


const getUserByName = (name) => {
  return global.registeredUsers.find(user => user.name === name);
};
const getUserById = (id) => {
  return global.registeredUsers.find(user => user.id === id);
};

initPassport(passport, getUserByName, getUserById);

/*
const indexRouter = import('../routes/index');
const usersRouter = import('../routes/users');
const signupRouter = import('../routes/signup');
const signinRouter = import('../routes/signin');
const signoutRouter = import('../routes/signout');
*/

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
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


const pool = new Pool({
  user: 'sprint',
  host: 'localhost',
  database: "animaldb",
  password: "password",
  port: 5432
});

/*
  async function main() {
    const uri = "mongodb+srv://sprintTeam:password1001@cluster0.oq1gf.mongodb.net/Cluster0?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
      await client.connect();
      
    await findOneListingsByAnimalName(client, "");
    }catch(err) {
      console.error(err);
    } finally {
      await client.close();
    }
   
    //btnwork()
  }

// function btnwork(){
//   getElementById("myBtn").addEventListener("click", myFunction)
//   function myFunction() {
//   query = getElementById("searchy")
//   console.log("query")

// }
// }
  
    main().catch(console.error);
*/

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

const query = "";
async function findOneListingsByAnimalName(client, nameOfListing) {
	const result = await client.db("animaldb").collection("animals").find({AnimalName: new RegExp(query)}).toArray();
	if(result){
		//console.log(`Found a listing in the collection with the name '${nameOfListing}'`)
		//console.log(result);
	}else{
		//console.log(`No listings found with the name '${nameOfListing}'`)
	}
}

app.use('/', indexRouter);
app.use('/users', checkSignedIn, usersRouter);
app.use('/signup', checkNotSignedIn, signupRouter);
app.use('/signin', checkNotSignedIn, signinRouter);
app.use('/signout', checkSignedIn ,signoutRouter);
app.use('/search', searchRouter);
app.use('/submit', submitRouter);


//let button = document.getElementById(myBtn)

app.post('/button' , ( req , res ) => {
  return res.json({
    message: 1234
  });
});





app.listen(9000, () => {
	console.log(`Listening on http://localhost:${port}`);
});

  var PGVar = new Promise(function (respond, reject) {
  return pool.query(`SELECT * FROM mock_data`, function (err, result){
    if (err) reject(err);
    respond(result);
    //console.log(result.rows)

  });
});
/*
function btnwork(){
  getElementById("myBtn").addEventListener("click", myFunction)
 function myFunction() {
 query = getElementById("searchy")
 console.log("query")
 
 }
 */


 // req.body.()