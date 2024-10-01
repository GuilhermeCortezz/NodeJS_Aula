const express = require('express');
const { engine } = require('express-handlebars');
const empregadoRoutes = require('./routes/empregadoRoutes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const departamentos = {
    1: 'Administrativo',
    2: 'Designer',
    3: 'Contabil',
    4: 'Fábrica'
};
// Configuração do Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        getDepartmentName: function (id) {
            return departamentos[id] || 'Desconhecido';
        },
        eq: (a, b) => a === b
    }  
}));
app.set('view engine', 'handlebars');

app.use(empregadoRoutes);

const PORT = 8081;
app.listen(PORT, () => console.log("Servidor ativo na porta", PORT));
