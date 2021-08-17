
//import express from 'express';
//import bcrypt from 'bcryptjs';
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const passport = require('passport');

const data = {
	message: 'Login to your account!',
	layout:  'layout.njk',
	title: 'Login',
	pages: global.pages,
	//users: global.registeredUsers
      };

router.get('/', function (req, res) {
	res.render('signin.njk', data);
});

router.post('/', passport.authenticate('local', {
	successRedirect: '/search',
	failureRedirect: '/signin',
	failureFlash: true
}));

module.exports = router;