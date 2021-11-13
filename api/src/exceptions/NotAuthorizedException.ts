import HttpException from './HttpException';

/**
 * Not authorized exception.
 */
class NotAuthorizedException extends HttpException {
    /**
     * Create an NotAuthorizedException.
     */
    constructor(details?: Record<string, unknown>) {
        super(403, 'Not authorized', details);
        Object.setPrototypeOf(this, NotAuthorizedException.prototype);
    }
}

export default NotAuthorizedException;
