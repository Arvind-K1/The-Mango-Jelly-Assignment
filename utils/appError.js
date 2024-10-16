// Custom error class that extends the built-in Error class
class AppError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export { AppError }