//import express from 'express';
const express = require('express');
const router = express.Router();

global.pages = [
  { url: "/", title: "Home" },
  { url: "/signup", title: "Sign up" },
  { url: "/signin", title: "Sign in" },
  { url: "/signout", title: "Sign out" },
  { url: "/search", title: "Search"}
];

let data = {
  message: 'Hello world!',
  layout:  'layout.njk',
  title: 'Nunjucks example',
  pages: global.pages
};

/* GET home page. */
router.get('/', async function(req, res) {
  if(!req.isAuthenticated()) {
    data.user = undefined;
  }
  
  data.user = req.user ? req.user.name : data.user;
  res.render('index.njk', data);
});

module.exports = router;