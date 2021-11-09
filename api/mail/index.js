const express = require('express');
const router = express.Router();
const mailController = require('./mailController');

/* GET users listing. */
router.get('/', mailController.senndmail());

module.exports = router;
