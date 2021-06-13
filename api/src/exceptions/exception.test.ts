import HttpException from './HttpException';
import NotFoundException from './NotFoundException';
import NotImplementedException from './NotImplementedException';
import ValidationException from './ValidationException';

describe('HttpException', () => {
    it('can be serialized into an object without details', () => {
        const status = 500;
        const message = 'internal server error';

        const e = new HttpException(status, message);
        const obj = e.serialize();

        expect(obj.code).toEqual(status);
        expect(obj.message).toEqual(message);
    });

    it('can be serialized into an object with details', () => {
        const status = 400;
        const message = 'validation error';
        const details = { fieldA: 'is too short' };

        const e = new HttpException(status, message, details);
        const obj = e.serialize();

        expect(obj.code).toEqual(status);
        expect(obj.message).toEqual(message);
        expect(obj.details).toEqual(details);
    });
});

describe('NotFoundException', () => {
    it('serializes properly', () => {
        const e = new NotFoundException();
        const obj = e.serialize();

        expect(obj.code).toEqual(404);
        expect(obj.message).toEqual('Not found');
        expect(obj.details).toBeUndefined();
    });
});

describe('NotImplementedException', () => {
    it('serializes properly', () => {
        const e = new NotImplementedException('myRoute');
        const obj = e.serialize();

        expect(obj.code).toEqual(404);
        expect(obj.message).toEqual('Route myRoute is not implemented');
        expect(obj.details).toBeUndefined();
    });
});

describe('ValidationException', () => {
    it('serializes properly', () => {
        const e = new ValidationException('Body', { fieldA: 'Is too long' });
        const obj = e.serialize();

        expect(obj.code).toEqual(400);
        expect(obj.message).toEqual('Invalid body');
        expect(obj.details).toMatchObject({ fieldA: 'Is too long' });
    });
});

describe('instanceof checks', () => {
    test('HttpException is instanceof HttpException', () => {
        expect(new HttpException(500, 'msg') instanceof HttpException).toBeTruthy();
    });

    test('Child class is instanceof HttpException', () => {
        expect(new NotFoundException() instanceof HttpException).toBeTruthy();
    });

    test('Child class is instanceof child class', () => {
        expect(new NotFoundException() instanceof NotFoundException).toBeTruthy();
    });
});
