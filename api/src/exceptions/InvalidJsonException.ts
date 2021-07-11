import HttpException from './HttpException';

/**
 * Invalid JSON exception.
 */
class InvalidJsonException extends HttpException {
    /**
     * Create an InvalidJsonException.
     */
    constructor(msg: string) {
        super(400, msg);
        Object.setPrototypeOf(this, InvalidJsonException.prototype);
    }
}

export default InvalidJsonException;

// TODO test
