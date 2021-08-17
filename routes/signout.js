//import express from 'express';
const express = require('express');
const router = express.Router();
const Pool = require('pg-pool');

const pool = new Pool({
  user: 'sprint',
  host: 'localhost',
  database: "animaldb",
  password: "password",
  port: 5432
});

let data = {
  message: 'Signed out of your account!',
  layout:  'layout.njk',
  title: 'Sign out',
  pages: global.pages
};

router.get('/', (req, res) => {
  res.render('signout.njk', data);
});




router.post('/', async function(req, res) {
  //global.loggedInUser = undefined;
  //res.render('index.njk', data);
  req.logOut();
  req.user = undefined;
  res.redirect('/signin');
});


module.exports = router;
