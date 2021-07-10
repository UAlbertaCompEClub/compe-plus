import { NextFunction, Request, Response } from 'express';

import NotAuthenticatedException from '../exceptions/NotAuthenticatedException';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import NotFoundException from '../exceptions/NotFoundException';
import Scope from '../types/scopes';
import logger from '../util/logger';
import middleware from './middleware';

describe('notFound middleware', () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {};
    const nextFunction: NextFunction = jest.fn();
    mockResponse.json = jest.fn().mockReturnValue(mockResponse);
    mockResponse.status = jest.fn().mockReturnValue(mockResponse);

    it('always returns a NotFoundException', () => {
        expect(() => {
            middleware.notFound()(mockRequest as Request, mockResponse as Response, nextFunction);
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

    it('converts any thrown error to a NotAuthenticated error', () => {
        middleware.authenticate()[1](new Error('test'), mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toBeCalledWith(new NotAuthenticatedException());
    });
});

describe('authorize middleware', () => {
    let mockRequest: Partial<Request> = {};
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

    it('throws error without correct scope', () => {
        middleware.authorize(Scope.CreateDocuments)[0](mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toBeCalledWith({ error: 'Forbidden', message: 'Insufficient scope', statusCode: 403 });
    });

    it('does not throw error with correct scope', () => {
        mockRequest.user = { sub: 'test', scope: 'create:documents' };
        middleware.authorize(Scope.CreateDocuments)[0](mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toBeCalledWith();
    });

    it('converts any thrown error to a NotAuthorized error', () => {
        middleware.authorize(Scope.CreateDocuments)[1](new Error('test'), mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toBeCalledWith(new NotAuthorizedException());
    });
});

describe('authorizeAndFallthrough middleware', () => {
    let mockRequest: Partial<Request> = {};
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

    it('throws error without correct scope', () => {
        middleware.authorizeAndFallThrough(Scope.CreateDocuments)[0](mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toBeCalledWith({ error: 'Forbidden', message: 'Insufficient scope', statusCode: 403 });
    });

    it('does not throw error with correct scope', () => {
        mockRequest.user = { sub: 'test', scope: 'create:documents' };
        middleware.authorizeAndFallThrough(Scope.CreateDocuments)[0](mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toBeCalledWith();
    });

    it('calls next route if unauthroized', () => {
        middleware.authorizeAndFallThrough(Scope.CreateDocuments)[1](new Error('test'), mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toBeCalledWith('route');
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
