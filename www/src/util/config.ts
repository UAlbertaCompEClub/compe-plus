const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || '';
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
const SERVER_ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT || 'http://localhost:1337';
const SERVER_AUDIENCE = process.env.REACT_APP_SERVER_AUDIENCE || '';
const MAILCHIMP_URL = process.env.REACT_APP_MAILCHIMP_URL || '';
const ADOBE_PDF_ID = process.env.REACT_APP_ADOBE_PDF_ID || '';
const MAX_RESUME_SIZE_BYTES = process.env.REACT_APP_MAX_RESUME_SIZE_BYTES || '75000';

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
    mailchimpUrl: MAILCHIMP_URL,
    adobePdfId: ADOBE_PDF_ID,
    maxResumeSizeBytes: parseFloat(MAX_RESUME_SIZE_BYTES),
};

export default config;
