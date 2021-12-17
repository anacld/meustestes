const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}); }
        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, fields) => {
                conn.release(); //importante libera a conexao
                if (error) { return res.status(500).send({ error: error}); }
                const response = {
                    quantidade: resultado.length,
                    produtos: resultado.map(prod => {
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os produtos',
                                url: 'http://localhost:3000/produtos/' + prod.id_produto
                            }
                        };
                    })
                };
                return res.status(200).send({response});
            }
        );
    });
});

//INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error}); }
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release(); //importante libera a conexao
                if (error) {return res.status(500).send({error: error}); }
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        );
    });
});

//RETORNA UM PRODUTO ESPECIFICO
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}); }
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                conn.release(); //importante libera a conexao
                if (error) { return res.status(500).send({ error: error}); }
                return res.status(200).send({response: resultado});
            }
        );
    });
});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error}); }
        conn.query(
            'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?',
            [req.body.nome, req.body.preco, req.body.id_produto],
            (error, resultado, field) => {
                conn.release(); //importante libera a conexao
                if (error) {return res.status(500).send({error: error}); }
                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso'
                });
            }
        );
    });
});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error}); }
        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, resultado, field) => {
                conn.release(); //importante libera a conexao
                if (error) {return res.status(500).send({error: error}); }
                res.status(202).send({
                    mensagem: 'Produto deletado com sucesso'
                });
            }
        );
    });
});

module.exports = router;