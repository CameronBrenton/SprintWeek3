
const express = require('express');
const router = express.Router();

const data = {
	message: 'Go ahead and make a search!',
	layout: 'layout.njk',
	title: 'Search',
	pages: global.pages
};

// Get the search page
router.get('/', function (req, res) {
	res.render('search.njk', data)
});

module.exports = router;
