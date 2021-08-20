
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const fetch = require("node-fetch")

const data = {
	message: 'Go ahead and make a search!',
	layout: 'layout.njk',
	title: 'Search',
	pages: global.pages,
	//users: global.registeredUsers
};

router.get('/', function (req, res) {
	res.render('search.njk', data)
});

module.exports = router;
