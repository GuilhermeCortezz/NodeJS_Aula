const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const produtoController = {
  create: async (req, res) => {
    const { descricao, quantidade, valor, proprietario_id } = req.body;
    const produto = await prisma.produtos.create({ data: { descricao, quantidade, valor, proprietario_id } });
    res.json(produto);
  },

  findAll: async (req, res) => {
    const produtos = await prisma.produtos.findMany();
    res.json(produtos);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { descricao, quantidade, valor, proprietario_id } = req.body;
    const produto = await prisma.produtos.update({ where: { id: parseInt(id) }, data: { descricao, quantidade, valor, proprietario_id } });
    res.json(produto);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await prisma.produtos.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Produto deletado' });
  },


  findMaxQuantity: async (req, res) => {
    const produto = await prisma.produtos.findFirst({
      orderBy: { quantidade: 'desc' },
    });
    res.json(produto);
  },

  findMaxValue: async (req, res) => {
    const produto = await prisma.produtos.findFirst({
      orderBy: { valor: 'desc' },
    });
    res.json(produto);
  },

  findMaxTotalValue: async (req, res) => {
    const produtos = await prisma.produtos.findMany();
    const produtoMaiorValorTotal = produtos.reduce((prev, curr) => {
      const totalCurr = curr.quantidade * curr.valor;
      const totalPrev = prev.quantidade * prev.valor;
      return totalCurr > totalPrev ? curr : prev;
    });
    res.json(produtoMaiorValorTotal);
  },
};

module.exports = produtoController;
