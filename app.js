const express = require('express');
const app = express();

const rotaProdutos = require('./routes/produtos');
app.use('/produtos', rotaProdutos);

const rotaPedidos = require('./routes/pedidos');
app.use('/pedidos', rotaPedidos);

// tratamento de erro quando nao encontra a rota
app.use((req, res, next) => {
    const erro = new Error('Página não encontrada!');
    erro.status(404);
    next(erro);
})

module.exports = app;