const { sequelize } = require('../config/database');
const Empregado = require('../models/empregados')(sequelize);
const { Op } = require('sequelize');


// Função para calcular salário líquido
const calcularSalarioLiquido = (salarioBruto) => {
    const inss = salarioBruto * 0.11;
    let irpf = 0;

    if (salarioBruto <= 1903.98) {
        irpf = 0;
    } else if (salarioBruto <= 2826.65) {
        irpf = (salarioBruto - 1903.98) * 0.075;
    } else if (salarioBruto <= 3751.06) {
        irpf = (2826.65 - 1903.98) * 0.075 + (salarioBruto - 2826.65) * 0.15;
    } else if (salarioBruto <= 4664.68) {
        irpf = (2826.65 - 1903.98) * 0.075 + (3751.06 - 2826.65) * 0.15 + (salarioBruto - 3751.06) * 0.225;
    } else {
        irpf = (2826.65 - 1903.98) * 0.075 + (3751.06 - 2826.65) * 0.15 + (4664.68 - 3751.06) * 0.225 + (salarioBruto - 4664.68) * 0.275;
    }

    return salarioBruto - inss - irpf;
};

// Criar um novo empregado
exports.createEmpregado = async (req, res) => {
    const { nome, salarioBruto, departamento } = req.body;
    await Empregado.create({ nome, salarioBruto, departamento });
    res.redirect('/');
};

// Listar empregados
exports.listEmpregados = async (req, res) => {
    const empregados = await Empregado.findAll();
    const empregadosComSalarioLiquido = empregados.map(emp => ({
        id: emp.id,
        nome: emp.nome,
        salarioBruto: emp.salarioBruto,
        salarioLiquido: calcularSalarioLiquido(emp.salarioBruto),
        departamento: emp.departamento,
    }));
    res.render('empregados', { empregados: empregadosComSalarioLiquido });
};

// Deletar um empregado
exports.deleteEmpregado = async (req, res) => {
    const { id } = req.params; // Pega o ID do empregado a partir dos parâmetros da URL
    await Empregado.destroy({ where: { id } }); // Deleta o empregado pelo ID
    res.redirect('/'); // Redireciona de volta para a lista de empregados
};

// Mostrar o formulário de edição
exports.editEmpregado = async (req, res) => {
    const { id } = req.params;
    const empregado = await Empregado.findByPk(id);
    res.render('editarEmpregado', { empregado: empregado.dataValues }); // Passa apenas os valores
};


// Atualizar um empregado
exports.updateEmpregado = async (req, res) => {
    const { id } = req.params;
    const { nome, salarioBruto, departamento } = req.body; // Pega os dados do formulário
    await Empregado.update({ nome, salarioBruto, departamento }, { where: { id } }); // Atualiza os dados
    res.redirect('/'); // Redireciona para a lista de empregados
};

// Pesquisar quem ganha o maior salário
exports.maiorSalario = async (req, res) => {
    const empregado = await Empregado.findOne({
        order: [['salarioBruto', 'DESC']]
    });
    res.render('resultado', { empregado: empregado.dataValues, message: "Maior Salário" });
};

// Pesquisar quem ganha o menor salário
exports.menorSalario = async (req, res) => {
    const empregado = await Empregado.findOne({
        order: [['salarioBruto', 'ASC']]
    });
    res.render('resultado', { empregado: empregado.dataValues, message: "Menor Salário" });
};

// Pesquisar por nome
exports.pesquisarPorNome = async (req, res) => {
    const { nome } = req.query;
    const empregados = await Empregado.findAll({
        where: {
            nome: {
                [Op.like]: `%${nome}%`
            }
        }
    });
    res.render('resultadoPesquisa', { empregados: empregados.dataValues, query: nome });
};

// Classificar por setor de trabalho
exports.classificarPorSetor = async (req, res) => {
    const empregados = await Empregado.findAll({
        order: [['departamento', 'ASC']]
    });
    res.render('resultadoClassificacao', { empregados: empregados.dataValues });
};