const express = require('express');
const router = express.Router();
const mailController = require('./mailController');
const passport = require('../../authentication/index')

router.get('/sendMail', passport.authenticate('jwt', { session: false }),mailController.SendMail );
router.get('/CreateInviteLink',passport.authenticate('jwt', { session: false }), mailController.CreateInviteLink);
router.get('/AccessInviteLink',passport.authenticate('jwt', { session: false }), mailController.AccessInviteLink)
module.exports = router;
