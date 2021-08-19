import pg from 'pg';

import config from './config';
import logger from './logger';

/**
 * Pool of Postgres connections to avoid overhead of connecting on every request.
 */
const pool: pg.Pool = new pg.Pool({
    connectionString: config.databaseUrl,
    log: (...messages: unknown[]): void => {
        logger.trace('pg: %s', messages);
    },
    ssl: {
        rejectUnauthorized: false,
    },
});

// Don't let a pg restart kill the app
pool.on('error', (err) => logger.error(err, 'postgres pool error'));

export default pool;
