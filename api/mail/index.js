const express = require('express');
const router = express.Router();
const mailController = require('./mailController');

router.get('/sendMail', mailController.SendMail );
router.get('/createInviteLink', mailController.CreateInviteLink);
router.get('/AccessInviteLink', mailController.AccessInviteLink)
module.exports = router;
