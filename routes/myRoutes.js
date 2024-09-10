const express = require('express');
const router = express.Router();
var myController = require('../controllers/MyController');

router.get("/", myController.showForm);

module.exports = router