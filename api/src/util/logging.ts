// TODO figure out a more idiomatic way to do logging that plays nice with Heroku

/**
 * Return the current time in a human readable format.
 *
 * @returns Current time in an ISO format.
 */
function getTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Helper to log to console.
 *
 * @param level Level to log at.
 * @param namespace Namespace to log within.
 * @param message Message to log.
 * @param object Optional object to add to log.
 */
function log(level: string, namespace: string, message: string, object?: any) {
  if (object) {
    console.log(`[${getTimestamp()}] [${level}] [${namespace}] ${message}`, object);
  } else {
    console.log(`[${getTimestamp()}] [${level}] [${namespace}] ${message}`);
  }
}

/**
 * Log at an INFO level.
 * @param namespace Namespace to log within.
 * @param message Message to log.
 * @param object Optional object to add to log.
 */
function info(namespace: string, message: string, object?: any) {
  log('INFO', namespace, message, object);
}

/**
 * Log at a WARN level.
 * @param namespace Namespace to log within.
 * @param message Message to log.
 * @param object Optional object to add to log.
 */
function warn(namespace: string, message: string, object?: any) {
  log('WARN', namespace, message, object);
}

/**
 * Log at an ERROR level.
 * @param namespace Namespace to log within.
 * @param message Message to log.
 * @param object Optional object to add to log.
 */
function error(namespace: string, message: string, object?: any) {
  log('ERROR', namespace, message, object);
}

/**
 * Log at a DEBUG level.
 * @param namespace Namespace to log within.
 * @param message Message to log.
 * @param object Optional object to add to log.
 */
function debug(namespace: string, message: string, object?: any) {
  log('DEBUG', namespace, message, object);
}

export default {
  info,
  warn,
  error,
  debug,
};
