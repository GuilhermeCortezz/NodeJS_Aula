const express = require('express');
const FuncionarioController = require('../controllers/FuncionarioController');

const router = express.Router()
router.get('/funcionarios', FuncionarioController.listarFuncionarios)
router.get('/funcionario/:id', FuncionarioController.pesquisarFuncionario)
router.post('/funcionario', FuncionarioController.inserirFuncionario)
router.put('/funcionario/:id', FuncionarioController.editarFuncionario)
router.delete('/funcionario/:id', FuncionarioController.deletarFuncionario)

module.exports = router