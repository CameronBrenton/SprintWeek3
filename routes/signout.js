//import express from 'express';
const express = require('express');
const router = express.Router();

let data = {
  message: 'Signed out of your account!',
  layout:  'layout.njk',
  title: 'Sign out',
  pages: global.pages
};

router.get('/', async function(req, res) {
    global.loggedInUser = undefined;
  res.render('index.njk', data);
});

module.exports = router;
