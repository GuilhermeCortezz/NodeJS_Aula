const express = require('express');
const { engine } = require('express-handlebars');
const empregadoRoutes = require('./routes/empregadoRoutes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuração do Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        switch: (value, options) => {
            this.switchValue = value;
            return options.fn(this);
        },
        case: (value, options) => {
            return (value == this.switchValue) ? options.fn(this) : options.inverse(this);
        },
        default: (options) => {
            return options.fn(this);
        }
    }    
}));
app.set('view engine', 'handlebars');

app.use(empregadoRoutes);

const PORT = 8081;
app.listen(PORT, () => console.log("Servidor ativo na porta", PORT));
