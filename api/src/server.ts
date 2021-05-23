import http from "http";
import express from "express";
import logging from "./util/logging";
import config from "./util/config";
import sampleRoutes from "./routes/sample";
import middleware from "./routes/middleware";

const NAMESPACE = "Server";
const router = express();

/** Log the request */
router.use(middleware.logRequest);

/** Parse the request */
router.use(express.json());

/** Routes */
router.use("/api/v1", sampleRoutes);

/** Error handling */
router.use(middleware.notFound);

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
