const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const fetch = require("node-fetch")
const Pool = require('pg-pool')


const pool = new Pool({
	user: 'sprint',
	host: 'localhost',
	database: "animaldb",
	password: "password",
	port: 5432
});


router.post('/', function (req, res) {
	let animalnames = req.body.animalnames;
	pool.query(`SELECT * FROM mock_data WHERE animalnames = $1`, [animalnames], (err, results) => {
		if (err) {
			console.log(err)
		};
		console.log(results);
		//res.json(results);
		res.render('results.njk', {
			results: results
		});
	})
	

	
});

module.exports = router;
