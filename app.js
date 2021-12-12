const express = require('express');
const app = express();

const rotaProdutos = require('./routes/produtos');
app.use('/produtos', rotaProdutos);

const rotaPedidos = require('./routes/pedidos');
app.use('/pedidos', rotaPedidos);

//app.use((req, res, next) => {
//    res.status(200).send({
//        mensagem: 'Ok, deu certo'
//    });
//});
module.exports = app;