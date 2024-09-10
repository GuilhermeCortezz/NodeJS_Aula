const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var hbs = handlebars.create({defaultLayout:'main'});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use((req,res,next)=>{
    console.log("Time", Date.now());
    next();
})

app.get('/produtos', (req,res,next)=>{
    res.send("<h1>Meus produtos</h1><br><a href='/'>Voltar</a>");
    next();
})

app.get('/', (req,res,next)=>{
    res.render("form", {layout:false});
    //next();
})

app.post('/', (req, res, next) => {
    console.log('Nome:',req.body.name);
    console.log('Descrição:',req.body.description);
    //res.send('POST <na página>');
    res.render('show', {
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        email: req.body.email,
        description: req.body.description,
        layout:false
    });
})

app.listen(3000, (req,res, next) => {
    console.log("Servidor rodando!");

})