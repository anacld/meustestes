const express = require('express');
const app = express();

const rotaProdutos = require('./routes/produtos');
app.use('/produtos', rotaProdutos);

const rotaPedidos = require('./routes/pedidos');
app.use('/pedidos', rotaPedidos);

// tratamento de erro quando nao encontra a rota
app.use((req, res, next) => {
    const erro = new Error('Página não encontrada!');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});


module.exports = app;