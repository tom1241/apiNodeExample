//Instanciado o serviços
const config = require('./config/config')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const url = config.bd_String;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true }


//Conecta no MongoDB, passando opções de conexão
mongoose.connect(url, options);
//Evita mensagens no console
mongoose.set('useCreateIndex', true);

//Log do mongoDB
mongoose.connection.on('connected', () => {
    console.log('Conexão Bem Sucedida');
});

//Log do mongoDB
mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão de Banco de Dados, erro: ' + err);
});

//Log de Desconexão
mongoose.connection.on('disconnected', () => {
    console.log('Banco desconectado.');
});

//Body-Parser, serve para parse de objetos vindo do body de um post (Json da requisição no caso)
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


/**
 * para conecta montar minhas classes de dados local com mongo utilizo o mongoose: https://mongoosejs.com/
 * Um equivalente para isso para o Dynamo é o Dynamoose: https://www.npmjs.com/package/dynamoose
 */

//Instanciando Rotas
const indexRoute = require('./Routes/index');
const userRoute = require('./Routes/users');

//Orientando Rotas
app.use('/', indexRoute);
app.use('/user', userRoute);

//indicando a porta
app.listen(3000);
//exportando o modulos
module.exports = app;