const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((err, conn) => {
       if (err) { return res.status(500).send({ error: error}); }
       bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
           if (errBcrypt) { return res.status(500).send({ error: errBcrypt}); }
           conn.query(`INSERT INTO usuarios (email, senha) VALUES (?,?)`, 
           [req.body.emal, hash],
           (error, results) => {
                conn.release(); //importante libera a conexao
                if (error) {return res.status(500).send({error: error}); }
                response = {
                    mensagem: 'Usuário criado com sucesso',
                    usuarioCriado: {
                        id_usuario: results.insertId,
                        email: req.body.email
                    }
                };
                return res.status(201).send(response);
            });
        });
    });
});


module.exports = router;