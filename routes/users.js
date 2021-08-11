//import express from 'express';
const express = require('express');
const router = express.Router();

global.registeredUsers = [ // use a db through your UsersModel class
  { id: 0, name: "tomisin", city: "toronto", school: "mun" },
  { id: 1, name: "elon", city: "austin", school: "queens" },
  { id: 2, name: "jade", city: "st. john's", school: "keyin" },
  { id: 3, name: "jack", city: "ottawa", school: "algonquin" },
];

const data = {
  message: 'Hello all users!',
  layout:  'layout.njk',
  title: 'Users',
  pages: global.pages,
  users: global.registeredUsers
};

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users.njk', data);
});

module.exports = router;
