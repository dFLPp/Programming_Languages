const customAPIError = require("../Errors/customError");
const jwt = require("jsonwebtoken");

// request to '/dashboard' --> router middleware --> router --> this middleware --> controller --> app --> response

const authMiddleware = async (req, res, next) => {
    //cheking the header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) throw new customAPIError("You have no acess to this content", 401)
    
    //getting the token
    const token = authHeader.split(' ')[1]
    
    //verfiyng the token
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        next()

    } catch (error) {
        throw new customAPIError("You have no acess to this content", 401)
    }
}

module.exports = authMiddleware;