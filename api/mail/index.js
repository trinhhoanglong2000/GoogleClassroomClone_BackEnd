const express = require('express');
const router = express.Router();
const mailController = require('./mailController');

router.get('/sendMail', mailController.SendMail );

module.exports = router;
