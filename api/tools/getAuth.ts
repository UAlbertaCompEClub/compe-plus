import axios from 'axios';
import dotenv from 'dotenv';

/**
 * Get a test access token.
 * @param baseUrl Base url of authentication api to hit.
 * @param clientId Client id of test application.
 * @param clientSecret Client secret of test application.
 * @param audience Audience to request.
 */
const getToken = async (baseUrl: string, clientId: string, clientSecret: string, audience: string) => {
    const url = new URL(baseUrl);
    url.pathname = '/oauth/token';
    const body = {
        client_id: clientId,
        client_secret: clientSecret,
        audience: audience,
        grant_type: 'client_credentials',
    };
    const options = { headers: { 'content-type': 'application/json' } };
    const response = await axios.post(url.toString(), JSON.stringify(body), options);
    return response.data.access_token;
};

/**
 * Returns environment variable or throws if undefined.
 * @param env Environment variable.
 * @returns Environment variable.
 */
const getEnv = (env: string) => {
    const result = process.env[env];
    if (result) {
        return result;
    } else {
        throw new Error(`environment configuration not defined for ${env}`);
    }
};

// Run the tool. Make sure that you are running it from the api/ directory and have a .env.tools file setup.
(async () => {
    try {
        if (process.argv.length != 3) {
            throw new Error('Incorrect number of args');
        }
        let role = process.argv[2];
        if (!['user', 'reviewer', 'interviewer', 'admin'].includes(role)) {
            throw new Error('Invalid role');
        }
        role = role.toUpperCase();
        dotenv.config({ path: '.env.tools' });
        const baseUrl = getEnv(`${role}_AUTH0_ISSUER`);
        const clientId = getEnv(`${role}_TEST_APPLICATION_CLIENT_ID`);
        const clientSecret = getEnv(`${role}_TEST_APPLICATION_CLIENT_SECRET`);
        const audience = getEnv(`${role}_AUTH0_AUDIENCE`);

        const token = await getToken(baseUrl, clientId, clientSecret, audience);
        console.log(`Authorization: Bearer ${token}`);
    } catch (error) {
        console.error(error.message);
    }
})();
