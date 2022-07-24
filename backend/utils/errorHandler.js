

class ErrorHandler extends Error {


    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }

    handleError = (err, req, res, next) => {
        res.status(err.statusCode || 500).json({
            success: false,
            error: err.message || 'Internal Server Error',
        });

    };
}



module.exports = { ErrorHandler };