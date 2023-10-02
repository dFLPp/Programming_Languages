import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import customError from '../errors'

const createJWT = (id:any) => {
  return jwt.sign({ id: id }, `${process.env.JWT_SECRET}`, {
    expiresIn: '7d',
  })
}

const login = asyncHandler(async (req:Request, res:Response):Promise<any> => {
    const {email, password} = req.body;
    if(!email || !password) throw new customError('Provide all credentials', 400);

    const user = await User.findOne({email})
    if(!user) throw new customError('wrong credentials', 401);
    
    const isEqual = await bcrypt.compare(password, user.password)
    if(!isEqual) throw new customError('wrong password', 401);

    const token = createJWT(user._id);
    return res.status(201).json({user: {email: user.email, name: user.name, id: user._id}, token:token})

})
const register = asyncHandler(async (req:Request, res:Response):Promise<any> => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) throw new customError('Provide all credentials', 400);
    
    const sameEmail = await User.findOne({email});
    if(sameEmail) throw new customError('someone already is using this email', 400);

    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        const token = createJWT(user._id);
        return res.status(201).json({user: {email: user.email, name: user.name, id: user._id}, token:token})
    }else throw new customError('something went wrong... try again later', 400)
})

export {
    login,
    register
}