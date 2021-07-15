import config from './util/config';

const apiPrefix = 'api/v1';

export const users_endpoint = `http://${config.server.endpoint}/${apiPrefix}/users`;
