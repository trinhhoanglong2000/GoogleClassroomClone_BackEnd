const express = require('express');
const router = express.Router();
const classController = require('./classController');

/* GET users listing. */
router.get('/', classController.getAllClasses);

router.get('/:id', classController.detail);

router.post('/addClass',classController.addClass)

module.exports = router;
