import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';
import type * as s from 'zapatos/schema';

import * as auth0Repository from '../../repositories/auth0Repository';
import * as userRolesRepository from '../../repositories/userRolesRepository';
import Role from '../../types/roles';
import { decodeQueryToUser, toCamelCase } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAValidRole, beAValidUser } from '../validation';

type Params = {
    userId: string;
    role: string;
};

class ParamsValidator extends Validator<Params> {
    constructor() {
        super('route parameters');

        this.ruleFor('userId').mustAsync(beAValidUser);

        this.ruleFor('role').mustAsync(beAValidRole);
    }
}

type ResBody = CamelCasedProperties<s.user_roles.JSONSelectable>;

/**
 * Assign a new role to existing user.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns The newly registered user.
 */
const putRole = controller(async (req: Request<Params, ResBody>, res: Response<ResBody>): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);

    const userId = decodeQueryToUser(req.params.userId) ?? '';
    const role = req.params.role as Role;

    const assignedRoles = await userRolesRepository.get(userId);
    const indexOfAssignedRole = assignedRoles.findIndex((assignedRole) => assignedRole.role === role);
    if (indexOfAssignedRole >= 0) {
        res.status(409).json(toCamelCase(assignedRoles[indexOfAssignedRole]));
        return;
    }

    await auth0Repository.giveUserRole(userId, role);
    const result = await userRolesRepository.assign({ user_id: userId, role: role });

    res.status(204).json(toCamelCase(result));
});

export default putRole;
