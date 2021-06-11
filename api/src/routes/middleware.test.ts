import middleware from './middleware';
import { NextFunction, Request, Response } from 'express';
import logger from '../util/logger';
import * as jwtCheckModule from '../util/jwtCheck';

describe('notFound middleware', () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {};
    mockResponse.json = jest.fn().mockReturnValue(mockResponse);
    mockResponse.status = jest.fn().mockReturnValue(mockResponse);

    it('always returns 404', () => {
        const expectedResponse = {
            message: 'not found',
        };
        middleware.notFound()(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(404);
    });
});

describe('logRequest middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction;

    beforeEach(() => {
        mockRequest = {};
        mockRequest.url = '/api/v1/ping';
        mockRequest.method = 'GET';
        mockResponse = {};
        mockResponse.on = jest.fn();
        nextFunction = jest.fn();
    });

    it('logger is used', () => {
        const loggerMock = jest.spyOn(logger, 'child');
        middleware.logRequest()(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(loggerMock).toBeCalledTimes(3); // Experinmentally discovered. Proves logger is being used.
    });

    it('calls next middleware', () => {
        middleware.logRequest()(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).toBeCalledTimes(1);
    });
});

describe('jwtCheck middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction;

    beforeEach(() => {
        mockRequest = {};
        mockRequest.url = '/api/secure/v1/ping';
        mockRequest.method = 'GET';
        mockResponse = {};
        mockResponse.on = jest.fn();
        nextFunction = jest.fn();
    });

    it('jwtCheck is used', () => {
        const jwtCheckMock = jest.spyOn(jwtCheckModule, 'jwtCheck');
        middleware.checkJwt()(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(jwtCheckMock).toBeCalledTimes(1);
    });

    it('calls next middleware', () => {
        middleware.checkJwt()(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).toBeCalledTimes(1);
    });
});
