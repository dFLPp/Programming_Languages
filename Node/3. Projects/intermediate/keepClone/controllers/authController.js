const userModel = require("../db/models/user");
const { StatusCodes } = require('http-status-codes');
const { badRequestError, unauthenticatedError } = require('../errors/index');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register =  async (req, res) => {
    //MODO CONSISO/IDEAL
    const user = await userModel.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{ name: user.username }, token });
    
}
const login = async (req, res) => {
    //getting data
    const { email, password } = req.body;
    if(!email || !password){
        throw new badRequestError("Provide all info needed")
    }

    //searching for user
    const user = await userModel.findOne({ email });
    if(!user){
        throw new unauthenticatedError("Invalid email")
    }

    //comparing password
    const isCorrectPassword = await user.comparePassword(password);
    if(!isCorrectPassword){
        throw new unauthenticatedError("Wrong password")
    }

    //retrieving response
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: { username: user.username, email: user.email }, token});
}

module.exports = {
    register,
    login
}