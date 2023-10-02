import { Request, Response } from 'express';
const notFoundMiddleware = (req:Request, res:Response) => {
    res.status(404).send('<h1>there is nothing here...</h1>')
}

export default notFoundMiddleware