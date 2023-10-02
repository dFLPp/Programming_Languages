require("dotenv").config();
const customAPIError = require("../Errors/customError");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const {username, password} = req.body;
    //estamos usando nosso proprio errorMiddleware (e Error class) em conjunto do "express-async-errors"
    if(!username) throw new customAPIError("You Must provide a username", 400)
    if(!password) throw new customAPIError("You Must provide a password", 400)

    //id ficticío para o projeto. Você usaria o fornecido pela DB
    const id = new Date().getDate()

    // criando o jwt token (Não passe info. confidencial aqui) no payload, ele também não deve ser muito grande
    // usamos o payload para retornar conteúdo particular (podemos associar o id de um 'post' à um user dentro da DB, etc)
    
    //O jwt_secret é como se fosse uma senha que só seu server tem. É usada para descriptografar os tokens (eu acho)
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'})
    res.status(200).json({msg:"user created", token});
}

const dashboard = async (req, res) => {
    let authorizedData = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello ${req.user.username}`, secret: `your authorized data is: ${authorizedData}`})
}

module.exports = {
    login,
    dashboard,
} 