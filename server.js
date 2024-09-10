const express = require('express');
const app = express();

const handlebars = require('express-handlebars');
const appRoutes = require('./routes/myRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var hbs = handlebars.create({defaultLayout:'main'});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(appRoutes);

const PORT = 8081;
app.listen(PORT,()=>console.log("Servidor ativo na porta", PORT));