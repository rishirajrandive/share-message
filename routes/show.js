var express = require('express');
var router = express.Router();

/* GET show listing. */
router.get('/', function(req, res, next) {
  res.render('show', { title: 'Post Message' });
});

module.exports = router;
