import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const VERBOSE = process.env.VERBOSE || false;
const EXTRA_VERBOSE = process.env.EXTRA_VERBOSE || false;
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/compe-plus?sslmode=disable';

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
    extraVerbose: EXTRA_VERBOSE,
    databaseUrl: DATABASE_URL,
};

export default config;
