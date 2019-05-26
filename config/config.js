const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev' :
            return {
                bd_String: 'mongodb+srv://dev_user:teste123@cluster0-tethu.mongodb.net/test?retryWrites=true',
                jwt_pass: 'Suc0D34b0b0r4',
                expires: '1d'
            }
        case 'hml' : 
            return {
                bd_String: '',
                jwt_pass: '',
                expires: ''
            }
        case 'prod' :
            return {
                bd_String: '',
                jwt_pass: '',
                expires: ''
            }
    }
}

console.log('Iniciando a API no ambiente de: ' + env.toUpperCase());

module.exports = config();