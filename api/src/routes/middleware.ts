import { NextFunction, Request, Response } from "express";
import logging from "../util/logging";

const NAMESPACE = "Server";

/** Log the request */
/**
 * Log the request.
 *
 * @param req HTTP request.
 * @param res HTTP response.
 * @param next Next function in chain of handlers.
 */
function logRequest(req: Request, res: Response, next: NextFunction) {
  const message = `METHOD - [${req.method}], URL - [${req.url}]`;
  logging.info(NAMESPACE, message);

  res.on("finish", () => {
    logging.info(NAMESPACE, message);
  });

  next();
}

/**
 *
 * @param req HTTP request.
 * @param res HTTP response.
 * @param next Next function in chain of handlers.
 * @returns
 */
function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error("not found");

  res.status(404).json({ message: error.message });
}

export default {
  logRequest,
  notFound,
};
