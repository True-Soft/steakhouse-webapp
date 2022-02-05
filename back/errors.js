class httpErrors extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
      }
    
}

class badRequestError extends httpErrors{
    constructor(message) {
        super(400, message);
      }
}

class internalServerError extends httpErrors{
    constructor(message) {
        super(500, message);
      }
}

class unauthorizedError extends httpErrors{
    constructor(message) {
        super(401, message);
      }
}

class forbiddenError extends httpErrors{
    constructor(message) {
        super(403, message);
      }
}

class notFoundError extends httpErrors{
    constructor(message) {
        super(404, message);
      }
}

module.exports = {
    badRequestError,
    internalServerError,
    unauthorizedError,
    forbiddenError,
    notFoundError
};
