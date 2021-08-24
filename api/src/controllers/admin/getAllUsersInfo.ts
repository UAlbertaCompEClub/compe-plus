import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';

import * as adminRepository from '../../repositories/adminRepository';
import { userRoleSelectable } from '../../repositories/adminRepository';
import { toCamelCase } from '../../util/helper';
import controller from '../controllerUtil';

type ResBody = { users: CamelCasedProperties<userRoleSelectable>[] };

/**
 * Get all users and their roles.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns List of all users and their roles.
 */
const getAllUsersInfo = controller(async (_req: Request, res: Response<ResBody>): Promise<void> => {
    const users = await adminRepository.getUsersInfo();

    res.status(200).json({ users: users.map((user) => toCamelCase(user)) });
});

export default getAllUsersInfo;
