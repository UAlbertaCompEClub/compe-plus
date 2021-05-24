import middleware from './middleware';
import { NextFunction, Request, Response } from 'express';
import logging from '../util/logging';

describe('notFound middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    mockResponse.json = jest.fn().mockReturnValue(mockResponse);
    mockResponse.status = jest.fn().mockReturnValue(mockResponse);
    nextFunction = jest.fn();
  });

  it('always returns 404', () => {
    const expectedResponse = {
      message: 'not found',
    };
    middleware.notFound(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(404);
  });

  it('does not call further middleware', () => {
    middleware.notFound(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalledTimes(0);
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
    logging.info = jest.fn();
  });

  it('logs start of request', () => {
    middleware.logRequest(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(logging.info).toBeCalledTimes(1);
    expect(logging.info).toBeCalledWith('Server', 'METHOD - [GET], URL - [/api/v1/ping]');
  });

  it('logs end of request', () => {
    // TODO I don't know how to test this yet
  });

  it('calls next middleware', () => {
    middleware.logRequest(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
  });
});
