const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require('../errors/index.js');

const auth = async (req, res, next) => {
    //check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new UnauthenticatedError("Invalid token")
    } 

    //slipting token
    const token = authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        
        //Uma vez que o payload (dados 'pessoais' de cada usuário) foram adquiridos
        //Você então pode enviar uma resposta para o front-end, fazendo uma pagina personalizada para cada user
        //como exemplo, estamos simplismente criando um objeto (user) com informações básicas
        req.userInfoRetrieved = {userID:payload.userID, name:payload.name}
        next() //como isso é um middleware, precisa "dar a vez" para a proxima função da stack (event loop)
    } catch (error) {
        throw new UnauthenticatedError("Invalid token")
    }
}

module.exports = auth;