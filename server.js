const express = require('express');
const proprietarioRoutes = require('./routes/proprietarioRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

const app=express();
const port = 3000;
app.use(express.json());

app.use('/proprietarios', proprietarioRoutes);
app.use('/produtos', produtoRoutes);

app.listen(port, ()=>{
    console.log('Servidor rodando na porta: ' + port);
})