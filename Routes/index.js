//Instanciado o serviço do express
const express = require('express');
const router = express.Router();
const auth = require('../midlewares/auth');
const Users = require('../model/user');

//Get que fará a requisição a partir da raiz
router.get('/', auth, (req, res) => {
    return res.status(200).send({message: 'Bem Vindo'});
});

router.post('/', (req, res) => {
    return res.send({message: 'Post Index!'});
});


module.exports = router;