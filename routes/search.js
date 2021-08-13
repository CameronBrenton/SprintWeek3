
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const fetch = require("node-fetch")


router.get('/', function (req, res) {
	res.render('search.njk')
});

module.exports = router;
