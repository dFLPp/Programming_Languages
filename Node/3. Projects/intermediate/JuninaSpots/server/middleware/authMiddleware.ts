import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import customError from '../errors'

declare global {
  namespace Express {
    interface Request {
      userInfo:any
    }
  }
}

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const jwtPayload:any = jwt.verify(token, `${process.env.JWT_SECRET}`);
            if(jwtPayload){
              req.userInfo = {userID: jwtPayload.id}
            }else{
              throw new customError('not authorized', 401); 
            }
            next()
        } catch (error) {
            console.log("TOKEN: ", token)
            //auth error here
            console.log(error);
            throw new customError('this is the error', 401); 
        }
  }else{
    throw new customError('Not authorized, no token', 401);
  }
})

export default authMiddleware;