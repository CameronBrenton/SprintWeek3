const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const Pool = require('pg-pool')

// conenct to Postgres
const pool = new Pool({
  user: 'sprint',
  host: 'localhost',
  database: "animaldb",
  password: "password",
  port: 5432
});

const data = {
  message: "Go ahead and sign up for an account. It's free!",
  layout: 'layout.njk',
  title: 'Signup',
  pages: global.pages
};

router.get('/', function (req, res) {
  res.render('signup.njk', data);
});

// Sign up a new user
router.post('/', async function (req, res) {
  const { userid, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10)

  const id = Date.now().toString();
  const newUser = { id, userid, email, password };

  // insert new user into pg database
  let results = await pool.query('SELECT * FROM users where email = $1', [email]);
  if (results.rows.length > 0) {
    res.send("error! there is already an account with this email");
  } else {
    let insert_result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, encryptedPassword]);
    res.render('signin.njk', data);
  }

});

module.exports = router;
