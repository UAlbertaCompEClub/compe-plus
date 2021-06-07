import HttpException from './HttpException';

/**
 * Not implemented exception.
 */
class NotImplementedException extends HttpException {
    /**
     * Create a NotImplementedException.
     * @param routeName Route that is not implemented.
     */
    constructor(routeName: string) {
        super(404, `Route ${routeName} is not implemented`);
        Object.setPrototypeOf(this, NotImplementedException.prototype);
    }
}

export default NotImplementedException;
