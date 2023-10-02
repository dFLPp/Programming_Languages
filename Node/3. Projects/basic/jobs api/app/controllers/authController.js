const userModel = require("../models/User");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors/index.js');

const register = async (req, res) => {
    // if(!name || !email || !password) throw new BadRequestError("Provide all info needed")

    //validation && hashing && saving:
    const user = await userModel.create({...req.body})

    // generating token (one possible way)
    // const token = jwt.sign({userID: user._id, name: user.name}, "jwtSecretTEMP", {expiresIn: '30d'})
    const token = user.createJWT();

    //seding response (may very based on your front-end)
    res.status(StatusCodes.CREATED).json({user:{ name: user.name }, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        throw new BadRequestError("Provide all info needed")
    }

    const user = await userModel.findOne({ email }); //procurando um document (user) que contenha o email 'email' (do req.body)
    if(!user){
        throw new UnauthenticatedError("Invalid email")
    }

    const isCorrectPassword = await user.comparePassword(password)
    if(!isCorrectPassword){
        throw new UnauthenticatedError("Wrong password")
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{ name: user.name }, token });
}

module.exports = {
    register,
    login
}