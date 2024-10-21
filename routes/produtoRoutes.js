const express = require('express');
const produtoController = require('../controllers/produtoController');

const router = express.Router();

router.post('/', produtoController.create);
router.get('/', produtoController.findAll);
router.put('/:id', produtoController.update);
router.delete('/:id', produtoController.delete);
router.get('/maior-quantidade', produtoController.findMaxQuantity);
router.get('/maior-valor', produtoController.findMaxValue);
router.get('/maior-valor-total', produtoController.findMaxTotalValue);

module.exports = router;
