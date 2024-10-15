const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {
    async listarFuncionarios(req, res){
        try{
            const funcionarios = await prisma.funcionario.findMany();
            res.status(200).json(funcionarios);
        }catch(error){
            res.status(500).json({message: 'Erro ao listar os funcionarios'});
        }
    },

    async inserirFuncionario(req, res){
        try{
            const{
                matricula, nome, email, salario_bruto
            } = req.body;

            const novoFuncionario = await prisma.funcionario.create(
                {
                    data: {
                        matricula, nome, email, salario_bruto
                    }
                }
            )

            res.status(201).json({message: 'Funcionario criado com sucesso!'});

        }catch(error){
            res.status(500).json({message: 'Erro ao adicionar o funcionário'});
        }
    },

    async deletarFuncionario(req, res){
        try{
            const id = req.params.id;

            await prisma.funcionario.delete(
                {
                    where: {
                        id: Number(id)
                    }
                }
            )

            res.status(204).json({message: 'Funcionario removido com sucesso!'});

        }catch(error){
            res.status(500).json({message: 'Erro ao remover o funcionário'});
        }
    },

    async editarFuncionario(req, res){
        try{
            const id = req.params.id;
            const{
                matricula, nome, email, salario_bruto
            } = req.body;

            await prisma.funcionario.update(
                {
                    where: {
                        id: Number(id)
                    },
                    data: {
                        matricula, nome, email, salario_bruto
                    }
                }
            )

            res.status(201).json({message: 'Funcionario editado com sucesso!'});

        }catch(error){
            res.status(500).json({message: 'Erro ao editar o funcionário'});
        }
    },

    async pesquisarFuncionario(req, res){
        try{
            const id = req.params.id;

            const funcionario = await prisma.funcionario.findUnique({
                where: {
                  id: Number(id),
                },
              })
            if(funcionario){
                res.status(201).json(funcionario);
            }
            else{
                res.status(500).json('Funcionário não encontrado');
            }

        }catch(error){
            res.status(500).json({message: 'Funcionário não encontrado'});
        }
    }
}// module.exports