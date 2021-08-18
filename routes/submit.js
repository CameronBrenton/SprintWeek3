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




// router.post('/', async function (req, res) {
// 	const dataBase = req.body.client
// 	if (dataBase.value = "mongodb") {
// 		let query = req.body.important_string;
// 		const results = await client.db("animaldb").collection("animals").find({ AnimalName: new RegExp(query) }).toArray()
// 			.then(function (result) {
// 				//result = JSON.stringify(result);
// 				result = result.map(function (animal) {
// 					return animal.AnimalName;
// 				});
// 				res.render('results.njk', {
// 					results: result
// 				});
// 			})
// 			.catch(function (err) {
// 				console.log(err);
// 			})
// 		}
// 	})
// 	router.post('/', async function (req, res) {
// 		const search = req.body.important_string;
// 		const dataBase = req.body.client
// 		if (dataBase.value = 'postgres'){
// 			let search_results = await pool.query("SELECT * FROM mock_data WHERE animalnames LIKE '" + search + "'")
// 			console.log(search_results)
// 			res.render('results.njk', {
// 				results: search_results.rows.map(result => JSON.stringify(result))
// 			});
// 		}
// 		});
	
router.post('/', async function (req, res) {
	const search = req.body.important_string;
	const dataBase = req.body.client
	console.log(dataBase);
	if (dataBase === 'postgres'){
		let search_results = await pool.query("SELECT * FROM mock_data WHERE animalnames ILIKE '%" + search + "%'")
		console.log(search_results)
		res.render('results.njk', {
			results: search_results.rows.map(result => JSON.stringify(result))
		})
	}else if(dataBase === 'mongodb'){
		let query = req.body.important_string;
		let results = await client.db("animaldb").collection("animals").find({AnimalName: new RegExp(query, 'i')}).toArray()

		//result = JSON.stringify(result);
		results = results.map(function(animal){
			return animal.AnimalName;
		});
		res.render('results.njk', {
			results: results
		})
			
	}else{
		
		console.log(dataBase);
		
		let query = req.body.important_string;
		let search_results_mongo = await client.db("animaldb").collection("animals").find({AnimalName: new RegExp(query)}).toArray()
		let search_results_pg = await pool.query("SELECT * FROM mock_data WHERE animalnames ILIKE '%" + query + "%'")
		console.log(search_results_pg)

		//result = JSON.stringify(result);
		search_results_mongo = search_results_mongo.map(function(animal){
			return animal.AnimalName;
		});
		search_results_pg = search_results_pg.rows.map(function(animal){
			return animal.animalnames;
		});
		res.render('results.njk', {
			results: search_results_mongo,
			results2: search_results_pg
		})
	}
});



/*
router.post('/', function (req, res) {
	let animalnames = req.body.important_string;
	pool.query(SELECT * FROM mock_data WHERE animalnames LIKE '" + search + "'"), [animalnames], (err, results) => {
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
