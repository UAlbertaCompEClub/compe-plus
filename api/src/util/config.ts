import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 1337;
const VERBOSE = process.env.VERBOSE || false;
const EXTRA_VERBOSE = process.env.EXTRA_VERBOSE || false;
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/compe-plus?sslmode=disable';
const AUTH0_JWKS_URI = process.env.AUTH0_JWKS_URI || '';
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || '';
const AUTH0_ISSUER = process.env.AUTH0_ISSUER || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
const DOMAIN = process.env.DOMAIN || '';
const ADMIN_ROLE_ID = process.env.ADMIN_ROLE_ID || '';
const INTERVIEWER_ROLE_ID = process.env.INTERVIEWER_ROLE_ID || '';
const REVIEWER_ROLE_ID = process.env.REVIEWER_ROLE_ID || '';
const STUDENT_ROLE_ID = process.env.STUDENT_ROLE_ID || '';
const BUCKETEER_AWS_ACCESS_KEY_ID = process.env.BUCKETEER_AWS_ACCESS_KEY_ID || 'S3RVER';
const BUCKETEER_AWS_SECRET_ACCESS_KEY = process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY || 'S3RVER';
const BUCKETEER_AWS_REGION = process.env.BUCKETEER_AWS_REGION || 'us-east-1';
const BUCKETEER_BUCKET_NAME = process.env.BUCKETEER_BUCKET_NAME || 'documents';
const BUCKETEER_ENDPOINT = process.env.BUCKETEER_ENDPOINT || '';

/**
 * Configuration for authentication.
 */
const AUTH0 = {
    jwks_uri: AUTH0_JWKS_URI,
    audience: AUTH0_AUDIENCE,
    issuer: AUTH0_ISSUER,
};

/**
 * Configuration for Auth0 user management api.
 */

const MANAGEMENT_API = {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    domain: DOMAIN,
    adminRoleId: ADMIN_ROLE_ID,
    interviewerRoleId: INTERVIEWER_ROLE_ID,
    reviewerRoleId: REVIEWER_ROLE_ID,
    studentRoleId: STUDENT_ROLE_ID,
};

/**
 * Configuration for bucketeer blob storage.
 */
const BUCKETEER = {
    aws_access_key_id: BUCKETEER_AWS_ACCESS_KEY_ID,
    aws_secret_access_key: BUCKETEER_AWS_SECRET_ACCESS_KEY,
    aws_region: BUCKETEER_AWS_REGION,
    bucket_name: BUCKETEER_BUCKET_NAME,
    endpoint: BUCKETEER_ENDPOINT,
};

/**
 * Configuration for application.
 */
const config = {
    port: PORT,
    auth0: AUTH0,
    verbose: VERBOSE,
    extraVerbose: EXTRA_VERBOSE,
    databaseUrl: DATABASE_URL,
    managementApi: MANAGEMENT_API,
    bucketeer: BUCKETEER,
};

export default config;
