import { Request, Response, NextFunction } from 'express';
import customError from '../errors'

const errorMiddleware = (err:customError, req:Request, res:Response, next:NextFunction) => {
    const statusCode = err.statusCode ? err.statusCode : 500
    res.status(statusCode)
    return res.json({message: err.message}) 
}

export default errorMiddleware