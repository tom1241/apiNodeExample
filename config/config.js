const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev' :
            return {
                bd_String: '',
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