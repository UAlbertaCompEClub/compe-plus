import controller from './controllerUtil';
import { NextFunction, Request, Response } from 'express';

describe('controller helper function', () => {
    it('runs given controller', async () => {
        const mockFn = jest.fn();
        const mockRequest: Partial<Request> = {};
        const mockResponse: Partial<Response> = {};
        const nextFunction: NextFunction = jest.fn();

        await controller(async (req, res, next) => {
            mockFn(req, res, next);
        })(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockFn).toBeCalledWith(mockRequest, mockResponse, nextFunction);
    });

    it('passes thrown exceptions to next', async () => {
        const mockRequest: Partial<Request> = {};
        const mockResponse: Partial<Response> = {};
        const nextFunction: NextFunction = jest.fn();
        const err = new Error('test');

        await controller(async () => {
            throw err;
        })(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).toBeCalledWith(err);
    });
});
