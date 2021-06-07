type ErrorJson = { code: number; message: string; details?: Record<string, unknown> };

/**
 * Base exception type for server.
 */
class HttpException extends Error {
    public status: number;
    public message: string;
    public details?: Record<string, unknown>;

    /**
     * Create an HttpException.
     * @param status HTTP status code of error.
     * @param message Error message.
     * @param details Object with more details on error.
     */
    constructor(status: number, message: string, details?: Record<string, unknown>) {
        super(message);
        this.status = status;
        this.message = message;
        this.details = details;
        Object.setPrototypeOf(this, HttpException.prototype);
    }

    /**
     * Returns an error serialized into JSON.
     * @returns JSON serialized error object.
     */
    serialize(): ErrorJson {
        return {
            code: this.status,
            message: this.message,
            details: this.details,
        };
    }
}

export default HttpException;
