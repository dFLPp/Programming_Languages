const customAPIError = require("./customError");
const { StatusCodes } = require('http-status-codes');

class unauthenticatedError extends customAPIError{
    constructor(message){
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = unauthenticatedError