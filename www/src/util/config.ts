const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || '';
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || '';

const AUTH0 = {
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
};

const config = {
    auth0: AUTH0,
};

export default config;
