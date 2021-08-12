//CLIENT SIDE

const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const fetch = require("node-fetch")

let fetchresponse = fetch('http://localhost:9000/app.js')
fetchresponse.then(function(response){
  console.log(response)
})

let data = {
  message: 'Hello world!',
  layout: 'layout.njk',
  title: 'Nunjucks example',
  pages: global.pages
};

router.get('/', function(req, res) {
  res.render('signup.njk', data);
});


function btnWork() {
  console.log('hello World')


}


router.get('/', function (req, res) {
	res.render('search.njk', data);
});

module.exports = router;
