const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || '';
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || '';

const SERVER_ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT || '';
const SERVER_AUDIENCE = process.env.REACT_APP_SERVER_AUDIENCE || '';

const AUTH0 = {
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
};

const SERVER = {
    endpoint: SERVER_ENDPOINT,
    audience: SERVER_AUDIENCE,
};

const config = {
    auth0: AUTH0,
    server: SERVER,
};

export default config;
