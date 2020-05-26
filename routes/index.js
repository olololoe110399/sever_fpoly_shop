const express = require ('express');
const router = express.Router ();
const {ensureAuthenticated, forwardAuthenticated} = require ('../config/auth');


// Welcome Page
router.get ('/', forwardAuthenticated, (req, res) => res.render ('welcome'));

router.get ('/404', ensureAuthenticated, (req, res) =>
  res.render ('404')
);

module.exports = router;
