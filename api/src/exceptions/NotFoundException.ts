import HttpException from './HttpException';

/**
 * Not found exception.
 */
class NotFoundException extends HttpException {
    /**
     * Create an NotFoundException.
     */
    constructor() {
        super(404, 'Not found', 'Resource was not found');
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
}

export default NotFoundException;
