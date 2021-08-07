import HttpException from './HttpException';

/**
 * Bad request exception.
 */
class BadRequestException extends HttpException {
    /**
     * Create a BadRequestException.
     * @param details More information on error.
     */
    constructor(details: Record<string, unknown>) {
        super(400, 'Bad request', details);
        Object.setPrototypeOf(this, BadRequestException.prototype);
    }
}

export default BadRequestException;
