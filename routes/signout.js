const express = require('express');
const router = express.Router();

let data = {
  message: 'Signed out of your account!',
  layout: 'layout.njk',
  title: 'Sign out',
  pages: global.pages
};

router.get('/', (req, res) => {
  res.render('signout.njk', data);
});

// Sign out of the application
router.post('/', async function (req, res) {
  req.logOut();
  req.user = undefined;
  res.redirect('/signin');
});

module.exports = router;
