import HttpException from './HttpException';

/**
 * Not authenticated exception.
 */
class NotAuthenticatedException extends HttpException {
    /**
     * Create an NotAuthenticatedException.
     */
    constructor() {
        super(401, 'Not authenticated');
        Object.setPrototypeOf(this, NotAuthenticatedException.prototype);
    }
}

export default NotAuthenticatedException;
