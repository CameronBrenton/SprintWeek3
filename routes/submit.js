const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const fetch = require("node-fetch")
const Pool = require('pg-pool')
const { MongoClient } = require('mongodb');



const pool = new Pool({
	user: 'sprint',
	host: 'localhost',
	database: "animaldb",
	password: "password",
	port: 5432
});


const uri = "mongodb+srv://sprintTeam:password1001@cluster0.oq1gf.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();




router.post('/', function (req, res){
	let query = req.body.important_string;
	const results = client.db("animaldb").collection("animals").find({AnimalName: new RegExp(query)}).toArray()
	.then(function(result){
		//result = JSON.stringify(result);
		result = result.map(function(animal){
			return animal.AnimalName;
		});
		res.render('results.njk', {
			results: result
		});
	})
	.catch(function(err){
		console.log(err);
	})
	

})


/*
router.post('/', function (req, res) {
	let animalnames = req.body.important_string;
	pool.query(`SELECT * FROM mock_data WHERE animalnames LIKE '%animalNames%'`, [animalnames], (err, results) => {
		if(err) {
			console.log(err);
		}
		res.render('results.njk', {
			results: results
		});
	});
})
console.log(pool.query)
*/

module.exports = router;
