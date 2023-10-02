const customAPIError = require("./handlers/customError");
const unauthenticatedError = require("./handlers/unauthenticated");
const notFoundError = require("./handlers/notFound");
const badRequestError = require("./handlers/badRequest");

module.exports = {
    customAPIError,
    unauthenticatedError,
    notFoundError,
    badRequestError
}
