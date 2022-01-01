const express = require('express');
const router = express.Router();

//RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}); }
        conn.query(
            'SELECT * FROM pedidos;',
            (error, result, fields) => {
                conn.release(); //importante libera a conexao
                if (error) { return res.status(500).send({ error: error}); }
                const response = {
                    quantidade: result.length,
                    produtos: result.map(pedido => {
                        return {
                            id_produto: pedido.id_produto,
                            id_pedido: pedido.id_pedido,
                            quantidade: pedido.quantidade,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um pedido específico',
                                url: 'http://localhost:3000/pedidos/' + pedido.id_pedido
                            }
                        };
                    })
                };
                return res.status(200).send({response});
            }
        );
    });
});

//INSERE UM PEDIDO
router.post('/', (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    };
    res.status(201).send({
        mensagem: 'Pedido criado',
        pedidoCriado: pedido
    });
});

//RETORNA DADOS DE UM PEDIDO
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido;
    res.status(200).send({
        mensagem: 'Detalhes do Pedido',
        id_pedido: id
    });
});

//ALTERA UM PEDIDO
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Pedido alterado!'
    });
});

//EXCLUI UM PEDIDO
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Pedido excluído!'
    });
});

module.exports = router;