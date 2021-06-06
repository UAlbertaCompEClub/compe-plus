type ErrorJson = { error: string; code: number; message: string };

/**
 * Base exception type for server.
 */
class HttpException extends Error {
    public status: number;
    public error: string;
    public message: string;

    /**
     * Create an HttpException.
     * @param status HTTP status code of error.
     * @param name Error name.
     * @param message Error message.
     */
    constructor(status: number, error: string, message: string) {
        super(message);
        this.status = status;
        this.error = error;
        this.message = message;
        Object.setPrototypeOf(this, HttpException.prototype);
    }

    /**
     * Returns an error serialized into JSON.
     * @returns JSON serialized error object.
     */
    serialize(): ErrorJson {
        return {
            error: this.error,
            code: this.status,
            message: this.message,
        };
    }
}

export default HttpException;
