import express, { json } from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import { MongoClient } from 'mongodb';
import nunjucks from 'nunjucks';
import passportLocal from 'passport-local';
const app = express();
const port = 9000;

/*MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("animaldb");
    dbo.createCollection("Animals2", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
  */

 nunjucks.configure({
   express: app
 })

  async function main() {
    const uri = "mongodb+srv://sprintTeam:password1001@cluster0.oq1gf.mongodb.net/Cluster0?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
      await client.connect();
      
      await findOneListingsByAnimalName(client, ""); 
    }catch(err) {
      console.error(err);
    } finally {
      await client.close();
    }
   
    //btnwork()
  }
// function btnwork(){
//   getElementById("myBtn").addEventListener("click", myFunction)
//   function myFunction() {
//   query = getElementById("searchy")
//   console.log("query")

// }
// }
  
main().catch(console.error);


const pool = new Pool({
    user: 'sprint',
    host: 'localhost',
    database: "animaldb",
    htmlpassword: "password",
    port: 5432
});

app.use(express.json());

/*async function findManyListingsByAnimalName(client, nameOfListing) {
	const result = await client.db("animaldb").collection("animals").findOne({ AnimalName: nameOfListing });
	if(result){
		console.log(`Found a listing in the collection with the name '${nameOfListing}'`)
		console.log(result);
	}else{
		console.log(`No listings found with the name '${nameOfListing}'`)
	}
}*/

const query = "";
async function findOneListingsByAnimalName(client, nameOfListing) {
	const result = await client.db("animaldb").collection("animals").find({AnimalName: new RegExp(query)}).toArray();
	if(result){
		console.log(`Found a listing in the collection with the name '${nameOfListing}'`)
		console.log(result);
	}else{
		console.log(`No listings found with the name '${nameOfListing}'`)
	}
}




app.listen(9000, () => {
	console.log(`Listening on http://localhost:${port}`);
});
  