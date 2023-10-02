const jwt = require("jsonwebtoken");
const userModel = require("../db/models/user");
const { unauthenticatedError } = require('../errors/index');

const auth = async (req, res, next) => {
    //geting the header
    const GETtoken = req.query.token;
    if(!GETtoken){
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            throw new unauthenticatedError("Você precisa se conectar para usar o app")
        }
        //getting token
        const token = authHeader.split(" ")[1];
        
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.userInfoRetrieved = {name:payload.username, userID:payload.userID};
            next();
        } catch (error) {
            throw new unauthenticatedError("Você precisa se conectar para usar o app");
        }
    }
    if(GETtoken){
        const payload = jwt.verify(GETtoken, process.env.JWT_SECRET);
        req.userInfoRetrieved = {name:payload.username, userID:payload.userID};
        next();
    }
    
}
module.exports = auth