const customAPIError = require("../Errors/customError")

const customErrorMiddleware = (err, req, res, next) => {
    if (err instanceof customAPIError){
      return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).send('Something went wrong try again later')
  }
  
  module.exports = customErrorMiddleware