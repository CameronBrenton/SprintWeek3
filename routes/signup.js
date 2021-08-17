const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const Pool = require('pg-pool')

const pool = new Pool({
  user: 'sprint',
  host: 'localhost',
  database: "animaldb",
  password: "password",
  port: 5432
});

const data = {
  message: 'Successfully Created an Account!',
  layout:  'layout.njk',
  title: 'Signup',
  pages: global.pages,
  //users: global.registeredUsers
};

router.get('/', function(req, res) {
  res.render('signup.njk', data);
});

router.post('/', async function (req, res) {
  const { userid, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10)

  const id = Date.now().toString();
  const newUser = { id, userid, email, password };

  // model.updateUser -> db....



  let results = await pool.query('SELECT * FROM users where email = $1', [email]);
  if (results.rows.length > 0) {
    res.send("error! there is already an account with this email");
  } else {
    let insert_result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, encryptedPassword]);
    res.render('signin.njk', data);
  }
  
});

module.exports = router;
