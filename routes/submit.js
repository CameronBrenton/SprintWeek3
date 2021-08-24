const express = require('express');
const router = express.Router();
const Pool = require('pg-pool')
const { MongoClient } = require('mongodb');

// connecting to Postgres
const pool = new Pool({
	user: 'sprint',
	host: 'localhost',
	database: "animaldb",
	password: "password",
	port: 5432
});
// connecting to Mongodb
const uri = "mongodb+srv://sprintTeam:password1001@cluster0.oq1gf.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();


// Posts a new query to one of the databases
router.post('/', async function (req, res) {
	const search = req.body.important_string;
	const dataBase = req.body.client
	console.log(dataBase);
	if (dataBase === 'postgres') {
		let search_results = await pool.query("SELECT * FROM mock_data WHERE animalnames ILIKE '%" + search + "%'")
		console.log(search_results)
		search_results = search_results.rows.map(function (animal) {
			return animal.animalnames;
		});
		res.render('results.njk', {
			results: search_results
		})
	} else if (dataBase === 'mongodb') {
		let query = req.body.important_string;
		let results = await client.db("animaldb").collection("animals").find({ AnimalName: new RegExp(query, 'i') }).toArray()

		results = results.map(function (animal) {
			return animal.AnimalName;
		});
		res.render('results.njk', {
			results: results
		})

	} else {

		console.log(dataBase);

		let query = req.body.important_string;
		let search_results_mongo = await client.db("animaldb").collection("animals").find({ AnimalName: new RegExp(query) }).toArray()
		let search_results_pg = await pool.query("SELECT * FROM mock_data WHERE animalnames ILIKE '%" + query + "%'")
		console.log(search_results_pg)

		search_results_mongo = search_results_mongo.map(function (animal) {
			return animal.AnimalName;
		});
		search_results_pg = search_results_pg.rows.map(function (animal) {
			return animal.animalnames;
		});
		res.render('results.njk', {
			results: search_results_mongo,
			results2: search_results_pg
		})
	}
});

module.exports = router;
