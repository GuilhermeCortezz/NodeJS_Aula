const express = require('express');
const proprietarioController = require('../controllers/proprietarioController');

const router = express.Router();

router.post('/', proprietarioController.create);
router.get('/', proprietarioController.findAll);
router.get('/:id', proprietarioController.findById);
router.put('/:id', proprietarioController.update);
router.delete('/:id', proprietarioController.delete);
router.get('/search/:nome', proprietarioController.searchByName);
router.get('/maior/produtos', proprietarioController.findMaxProducts);

module.exports = router;
