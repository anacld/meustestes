const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'usando o GET dentro da rota de produtos'
    });
});

//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };
    res.status(201).send({
        mensagem: 'Insere um produto',
        produtoCriado: produto
    });
});

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;

    if(id === 'especial') {
        res.status(200).send({
            mensagem: 'Você descobriu o ID especial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'Você passou um ID'
        });
    }
});

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando o PATCH dentro da rota de produtos'
    });
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando o DELETE dentro da rota de produtos'
    });
});

module.exports = router;