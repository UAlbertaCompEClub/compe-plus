import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const VERBOSE = process.env.VERBOSE || false;

/**
 * Configuration for server connection.
 */
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};

/**
 * Configuration for application.
 */
const config = {
    server: SERVER,
    verbose: VERBOSE,
};

export default config;
