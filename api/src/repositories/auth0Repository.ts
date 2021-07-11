import axios from 'axios';

import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import Role from '../types/roles';
import config from '../util/config';

/**
 * Fetch an access token for the Auth0 management API.
 * @returns Access token.
 */
const getAccessToken = async (): Promise<string> => {
    try {
        const result = await axios.post(
            `https://${config.managementApi.domain}/oauth/token`,
            {
                grant_type: 'client_credentials',
                client_id: config.managementApi.clientId,
                client_secret: config.managementApi.clientSecret,
                audience: `https://${config.managementApi.domain}/api/v2/`,
            },
            {
                headers: {
                    'content-type': 'application/json',
                },
            },
        );
        // TODO cache this access token for up to 24 hrs.
        return result.data.access_token;
    } catch (e) {
        throw new InternalServerErrorException({ issue: 'Failed to get access token for Auth0 managment API' }, e);
    }
};

/**
 * Give a user a role in Auth0.
 * @param user User to give role to.
 * @param role Role to give to user.
 */
const giveUserRole = async (user: string, role: Role): Promise<void> => {
    const accessToken = await getAccessToken();
    let roleId = '';
    switch (role) {
        case Role.Admin:
            roleId = config.managementApi.adminRoleId;
            break;
        case Role.Interviewer:
            roleId = config.managementApi.interviewerRoleId;
            break;
        case Role.Reviewer:
            roleId = config.managementApi.reviewerRoleId;
            break;
        case Role.Student:
            roleId = config.managementApi.studentRoleId;
            break;
    }

    let result;
    try {
        result = await axios.post(
            `https://${config.managementApi.domain}/api/v2/users/${user}/roles`,
            { roles: [roleId] },
            { headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}`, 'cache-control': 'no-cache' } },
        );
    } catch (e) {
        throw new InternalServerErrorException({ issue: 'Failed to give user role' }, e);
    }

    if (result.status != 204) {
        throw new InternalServerErrorException({ issue: 'Failed to give user role' }, new Error('Did not get expected 204 status code'));
    }
};

export { giveUserRole };
