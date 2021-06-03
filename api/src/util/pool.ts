import config from '../../util/config';
import logger from '../../util/logger';
import pg from 'pg';

/**
 * Pool of Postgres connections to avoid overhead of connecting on every request.
 */
const pool: pg.Pool = new pg.Pool({
    connectionString: config.databaseUrl,
    log: (...messages: unknown[]): void => {
        logger.trace('pg: %s', messages);
    },
});

// Don't let a pg restart kill the app
pool.on('error', (err) => logger.error(err, 'postgres pool error'));

export default pool;
