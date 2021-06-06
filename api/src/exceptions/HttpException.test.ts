import HttpException from './HttpException';

describe('HttpException', () => {
    it('can be serialized into an object', async () => {
        const status = 500;
        const error = 'internal server error';
        const message = 'something went wrong';

        const e = new HttpException(status, error, message);
        const obj = e.serialize();

        expect(obj.code).toEqual(status);
        expect(obj.error).toEqual(error);
        expect(obj.message).toEqual(message);
    });
});
