const express = require('express');
const funcRoutes = require('./routes/FuncionarioRoutes');

const app=express();
const port = 3000;
app.use(express.json());
app.use('/api', funcRoutes);

app.listen(port, ()=>{
    console.log('Servidor rodando na porta: ' + port);
})