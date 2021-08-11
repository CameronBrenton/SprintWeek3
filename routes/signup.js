const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


const data = {
  message: 'Create an account!',
  layout:  'layout.njk',
  title: 'Signup',
  pages: global.pages,
  users: global.registeredUsers
};

router.get('/', function(req, res) {
  res.render('signup.njk', data);
});

router.post('/', async function(req, res) {
  const { name, city, school, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10)

  const id = Date.now().toString();
  const newUser = { id, name, city, school };
  
  // model.updateUser -> db....
  global.registeredUsers.push(newUser);
  if(global.passwords === undefined) {
      global.passwords = {};
  }
  global.passwords[name] = encryptedPassword;

  res.render('users.njk', data);
});

module.exports = router;
