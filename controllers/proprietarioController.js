const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const proprietarioController = {
  create: async (req, res) => {
    const { nome, email, endereco } = req.body;
    const proprietario = await prisma.proprietarios.create({ data: { nome, email, endereco } });
    res.json(proprietario);
  },

  findAll: async (req, res) => {
    const proprietarios = await prisma.proprietarios.findMany();
    res.json(proprietarios);
  },

  findById: async (req, res) => {
    const { id } = req.params;
    const proprietario = await prisma.proprietarios.findUnique({ where: { id: parseInt(id) } });
    res.json(proprietario);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nome, email, endereco } = req.body;
    const proprietario = await prisma.proprietarios.update({ where: { id: parseInt(id) }, data: { nome, email, endereco } });
    res.json(proprietario);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await prisma.proprietarios.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Proprietário deletado' });
  },

  searchByName: async (req, res) => {
    const { nome } = req.params;
    const proprietarios = await prisma.proprietarios.findMany({
      where: {
        nome: {
          contains: nome,
        },
      },
    });
    res.json(proprietarios);
  },

  findMaxProducts: async (req, res) => {
    const produtos = await prisma.produtos.groupBy({
      by: ['proprietario_id'],
      _count: {
        proprietario_id: true,
      },
      orderBy: {
        _count: {
          proprietario_id: 'desc',
        },
      },
      take: 1,
    });

    if (produtos.length === 0) {
      return res.json({ message: 'Nenhum proprietário encontrado' });
    }

    const proprietarioId = produtos[0].proprietario_id;

    const proprietario = await prisma.proprietarios.findUnique({
      where: { id: proprietarioId },
    });

    res.json(proprietario);
  },
};

module.exports = proprietarioController;
