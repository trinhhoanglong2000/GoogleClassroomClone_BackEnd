const express = require('express');
const router = express.Router();
const classController = require('./classController');
const poolean = require('../../Database/index.js')
const { v4: uuidv4 } = require('uuid');
/* GET users listing. */
//router.get('/', classController.getAllClasses);
router.get('/', classController.getAllClasses)
router.get('/:id', classController.detail);

router.post('/addClass', classController.addClass)

router.post('/addAccount', classController.addClassesAccount)
module.exports = router;
