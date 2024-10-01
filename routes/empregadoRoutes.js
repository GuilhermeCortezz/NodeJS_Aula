const express = require('express');
const router = express.Router();
const empregadoController = require('../controllers/EmpregadoController');

router.get('/', empregadoController.listEmpregados);
router.post('/', empregadoController.createEmpregado);
router.post('/delete/:id', empregadoController.deleteEmpregado);
router.get('/edit/:id', empregadoController.editEmpregado);
router.post('/update/:id', empregadoController.updateEmpregado);
router.get("/maior-salario", empregadoController.maiorSalario);
router.get("/menor-salario", empregadoController.menorSalario);
router.get("/pesquisar", empregadoController.pesquisarPorNome);
router.get("/classificar-setor", empregadoController.classificarPorSetor);

module.exports = router;
