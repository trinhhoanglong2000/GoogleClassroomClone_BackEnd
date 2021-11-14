const express = require('express');
const router = express.Router();
const classController = require('./classController');
const poolean = require('../../Database/index.js')
const { v4: uuidv4 } = require('uuid');
const passport = require('../../authentication/index')
/* GET users listing. */
//router.get('/', classController.getAllClasses);
router.get('/', passport.authenticate('jwt', { session: false }),classController.getAllClasses)
router.get('/:id',passport.authenticate('jwt', { session: false }), classController.detail);

router.post('/addClass',passport.authenticate('jwt', { session: false }), classController.addClass)

router.post('/addAccount',passport.authenticate('jwt', { session: false }), classController.addClassesAccount)
module.exports = router;
