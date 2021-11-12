var express = require('express');
var router = express.Router();
const poolean = require('../Database/index.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
