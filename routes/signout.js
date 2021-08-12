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

router.get('/', function(req, res) {
  res.render('signout.njk', data);
});

router.post('/', async function(req, res) {
  const { name, city, school, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10)

  const id = Date.now().toString();
  const newUser = { id, name, city, school };
  
  // model.updateUser -> db....
  global.registeredUsers.push(newUser);
  if(global.passwords === undefined) {
      global.passwords = {};
  }
  global.passwords[name] = encryptedPassword;

  res.render('users.njk', data);
});


module.exports = router;
