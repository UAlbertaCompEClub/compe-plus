import HttpException from './HttpException';

/**
 * Internal server error exception.
 */
class InternalServerErrorException extends HttpException {
    public error: Error;
    /**
     * Create a InternalServerErrorException.
     * @param details More information on error.
     * @param error Actual error to log.
     */
    constructor(details: Record<string, unknown>, error: Error) {
        super(500, "The server has encountered a situation it doesn't know how to handle", details);
        this.error = error;
        Object.setPrototypeOf(this, InternalServerErrorException.prototype);
    }
}

export default InternalServerErrorException;
