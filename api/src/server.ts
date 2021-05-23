import http from "http";
import express from "express";
import logging from "./config/logging";
import config from "./config/config";
import sampleRoutes from "./routes/sample";

const NAMESPACE = "Server";
const router = express();

// TODO move to a middleware file
/** Log the request */
router.use((req, res, next) => {
  const message = `METHOD - [${req.method}], URL - [${req.url}]`;
  logging.info(NAMESPACE, message);

  res.on("finish", () => {
    logging.info(NAMESPACE, message);
  });

  next();
});

/** Parse the request */
router.use(express.json());

/** Routes */
router.use("/api/v1", sampleRoutes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");

  return res.status(404).json({ message: error.message });
});

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
