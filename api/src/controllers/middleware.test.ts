import { NextFunction, Request, Response } from 'express';

import NotFoundException from '../exceptions/NotFoundException';
import * as checkJwt from '../util/checkJwt';
import logger from '../util/logger';
import middleware from './middleware';

describe('notFound middleware', () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {};
    mockResponse.json = jest.fn().mockReturnValue(mockResponse);
    mockResponse.status = jest.fn().mockReturnValue(mockResponse);

    it('always returns a NotFoundException', () => {
        expect(() => {
            middleware.notFound()(mockRequest as Request, mockResponse as Response);
        }).toThrowError(new NotFoundException());
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
        expect(loggerMock).toBeCalledTimes(3); // Experimentally discovered. Proves logger is being used.
    });

    it('calls next middleware', () => {
        middleware.logRequest()(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).toBeCalledTimes(1);
    });
});

describe('authenticate middleware', () => {
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

    it('authenticate is used', () => {
        const authenticate = jest.spyOn(checkJwt, 'checkJwt');
        middleware.authenticate()(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(authenticate).toBeCalledTimes(1);
    });

    it('calls next middleware', () => {
        middleware.authenticate()(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).toBeCalledTimes(1);
    });
});

describe('errorHandler middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction;
    let resJson: jest.Mock;
    let resStatus: jest.Mock;

    beforeEach(() => {
        mockRequest = {};
        resJson = jest.fn();
        resStatus = jest.fn();
        mockResponse = {
            json: resJson,
            status: resStatus,
        };
        resJson.mockImplementation(() => mockResponse);
        resStatus.mockImplementation(() => mockResponse);
        nextFunction = jest.fn();
    });

    it('handles known errors', () => {
        middleware.errorHandler()(new NotFoundException(), mockRequest as Request, mockResponse as Response, nextFunction);
        expect(resJson).toBeCalledWith({ code: 404, message: 'Not found' });
        expect(resStatus).toBeCalledWith(404);
    });

    // Can't figure out how to mock req.log.error so I'm punting on this
    it.todo('handles unknown errors');
});
