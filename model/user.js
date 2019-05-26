const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//Montando model da tabela
const UserSchema = new Schema({ 
    //Colunas
    email: { type: String, required: true, unique: true, lowercase: true},
    password: { type: String, required: true, select: false},
    created: { type: Date, default: Date.now}
 });

 UserSchema.pre('save', async function (next) {
    let user = this;
    //Se o campo password não foi modificado passa direto
    if (!user.isModified('password')) return next;

    user.password = await bcrypt.hash(user.password, 10);
    return next();
 });

 /** 
  * usando function regular, pois o termo "this" tem um contexto diferente
  * detendo de uma arrow function "=>"
 */
/*UserSchema.pre('save', function(next) {
    let user = this;
    //Se o campo password não foi modificado passa direto
    if (!user.isModified('password')) return next;
    //Se não, criptografa o campo;

    //bcrypt.hash(objeto, passos de criptografia(10 máximo), resposta)
    bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted;
        return next();
    });
});*/

 module.exports = mongoose.model('User', UserSchema);