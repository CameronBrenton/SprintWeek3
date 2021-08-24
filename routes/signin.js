const express = require('express');
const router = express.Router();
const passport = require('passport');

const data = {
	layout: 'layout.njk',
	title: 'Login',
	pages: global.pages
};

router.get('/', function (req, res) {
	res.render('signin.njk', data);
});

// Login
router.post('/', passport.authenticate('local', {
	successRedirect: '/search',
	failureRedirect: '/signin',
	failureFlash: true
}));

module.exports = router;