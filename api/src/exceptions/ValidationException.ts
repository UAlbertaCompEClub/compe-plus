import HttpException from './HttpException';

/**
 * Validation exception.
 */
class ValidationException extends HttpException {
    /**
     * Create a ValidationException.
     * @param whatIsInvalid What part of the request is invalid.
     * @param whyItsInvalid Why is it invalid.
     */
    constructor(whatIsInvalid: string, whyItsInvalid: string) {
        super(400, `Invalid ${whatIsInvalid.toLowerCase()}`, whyItsInvalid);
        Object.setPrototypeOf(this, ValidationException.prototype);
    }
}

export default ValidationException;
