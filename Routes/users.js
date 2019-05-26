//Instanciado o serviço do express
const config = require('../config/config')
const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Função auxiliar de criação de token
const createToken = (userId) => {
    return jwt.sign({id: userId}, config.jwt_pass, {expiresIn: config.expires});
}

//Get que fará a requisição a partir da raiz
router.get('/', async (req, res) => {
    try { 
        const user = await Users.find({});
        return res.send(user);
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao Consultar usuários!' });
    }
});



router.post('/createUser', async (req, res) => {
    const { email, password } = req.body;
    //Se não for preenchido o email e senha = erro
    if (!email || !password) return res.status(400).send({ error: 'Dados Insulficientes'});
    try {
        if ( await Users.findOne( {email})) return res.send({ error: 'Usuário existente!'});
        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({user, token: createToken(user.id)});
    } catch (err) {
        return res.status(401).send({ error: 'Erro ao buscar Usuário'});
    }

})

router.post('/autentica', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).send({ error : 'Dados Insuficientes'});

    try { 
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.status(400).send({ error: 'Usuário Não existe'});
        
        const pass_ok = await bcrypt.compare(password, user.password);

        if (!pass_ok) return res.status(401).send({ error: 'Senha Errada!'});
        user.password = undefined;
        return res.status(200).send({user, token: createToken(user.id)});
        
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar Usuário'}); 
    }

})

module.exports = router;

//códigos de exemplo sen async
/*router.post('/createUser', (req, res) => {
    /**
     * Desestruturando o Objeto do body, o mesmo que fazer 
     * const obj = req.body;
     * diferença na hora de instaciar as variaveis do objeto,
     * ao inves de setar obj.email, desestruturando o objeto podemos passar somente email
     *  
    const {email, password} = req.body;

    //Se não for preenchido o email e senha = erro
    if (!email || !password) return res.send({ error: 'Dados Insulficientes'});
    //Buscar usuario antes de gravar
    Users.findOne({email}, (err, data) => {
        //Caso ocorra algum erro na consulta
        if(err) return res.send({ error: 'Erro ao Consultar usuários!' });
        //Se existir um email = erro
        if (data) return res.send({ error: 'Usuário já existe' });
        //Caso tudo estiver correto, seguir com a criação de usuário
        //create(objeto, resposta)
        Users.create(req.body, (err, data) => {
            if(err) return res.send({ error: 'Erro ao Criar usuário!' });
            //impedir que a senha apareça na resposta da requisição
            data.password = undefined;
            //Retorno dos dados
            return res.send(data);
        });    
    });
});*/

//------------------------------------------------------------------
/*router.post('/autentica', (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) return res.send({ error : 'Dados Insuficientes'});

    Users.findOne({email}, (err, data) => {
        if (err) return res.send({ error: 'Erro ao buscar usuário' });
        if (!data) return res.send({ error: 'Usuário não registrado!' });

        /**
         * Comparo o password criptografando, para ficar igual ao dado armazenado no banco de dados
         * compare(data: any, encrypted: string, callback?: (err: Error, same: boolean) => void)
         *
        bcrypt.compare(password, data.password, (err, same) => {
            /**
             * same é um booleano que retorna se a senha comparada pelo bcrypt é 
             * igual ao que está no banco de dados.
             * Se same for  false, retorno um erro de autenticação
             *
            if (!same) return res.send({ error: 'Senha errada!' });

            data.password = undefined;
            //se same for true, sucesso! Retorno data
            return res.send(data);     
        });
    //Forçando um select no campo password
    }).select('+password');
})

/* exemplo sem async
    router.get('/', async (req, res) => {
    Users.find({}, (err, data) => {
        if(err) return res.send({ error: 'Erro ao Consultar usuários!' });
        //Data = dados do resultado da consulta.
        return res.send(data);
    })
*/