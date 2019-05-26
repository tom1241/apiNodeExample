const config = require('../config/config')
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token_header = req.headers.auth;

    if (!token_header) return res.status(401).send({error: 'Token não Enviado!'});

    jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
        if(err) return res.status(400).send({error: 'Token Inválido!'});
        //res.locals.data = decoded;
        return next();
    });
};

module.exports = auth;