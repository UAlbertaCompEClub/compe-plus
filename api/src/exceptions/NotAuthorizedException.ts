import HttpException from './HttpException';

/**
 * Not authorized exception.
 */
class NotAuthorizedException extends HttpException {
    /**
     * Create an NotAuthorizedException.
     */
    constructor() {
        super(403, 'Not authorized');
        Object.setPrototypeOf(this, NotAuthorizedException.prototype);
    }
}

export default NotAuthorizedException;
