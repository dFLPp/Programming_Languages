const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "must provide name"],
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, "must provide email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "must provide valid email"],
        unique: true // check if alredy exists an email (document) with some value (make it unique)

    },
    password:{
        type: String,
        required: [true, "must provide password"],
        minlength: 6,
    }
})

//Usando um "pre-middleware" para fazer o hash/codificação da senha antes de armazenar na DB
userSchema.pre('save', async function(){
    //'save' é uma option que vai salvar as alterações feitas na callback (aqui), e então enviar para o proximo middleware
    //Você poderia fazer essa lógica dentro do Controller, mas o ideal é agrupar códigos semelhantes em locais semelhantes
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//Todos os documents que são criados sob a forma de "Schema", podem ter funções atribuidas a eles. Vamos atribuir uma função
// ao Schema "User" que vai automaticamente criar um JWT token para ele:
userSchema.methods.createJWT = function(){
    return jwt.sign({userID: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(maybePassword){
    const isEqual = await bcrypt.compare(maybePassword, this.password)
    return isEqual;
}

module.exports = mongoose.model("user", userSchema);