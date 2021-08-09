
const express = require('express');
var mongo = require('mongodb')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://sprintTeam:password1001@cluster0.oq1gf.mongodb.net/Cluster0?retryWrites=true&w=majority";

const app = express();
const port = 9000;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("animaldb");
    dbo.createCollection("Animals2", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });

app.use(express.json());

app.listen(9000, () => {
	console.log(`Listening on http://localhost:${port}`);
});
  