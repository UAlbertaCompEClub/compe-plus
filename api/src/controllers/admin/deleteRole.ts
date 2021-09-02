import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';
import type * as s from 'zapatos/schema';

import * as auth0Repository from '../../repositories/auth0Repository';
import * as userRolesRepository from '../../repositories/userRolesRepository';
import Role from '../../types/roles';
import { decodeQueryToUser, manyToCamelCase } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAValidRole, beAValidUser } from '../validation';

type ResBody = {
    users?: CamelCasedProperties<s.user_roles.JSONSelectable>[];
    message?: string;
};

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

const deleteRole = controller(async (req: Request<Params, ResBody>, res: Response<ResBody>): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);

    const userId = decodeQueryToUser(req.params.userId) ?? '';
    const role = req.params.role as Role;

    const assignedRoles = await userRolesRepository.get(userId);
    const indexOfAssignedRole = assignedRoles.findIndex((assignedRole) => assignedRole.role === role);
    if (indexOfAssignedRole < 0) {
        res.status(409).json({ message: 'User with id: ' + userId + ' did not have role: ' + role });
    }

    await auth0Repository.removeUserRole(userId, role);
    const result = await userRolesRepository.remove({ user_id: userId, role: role });

    res.status(204).json({ users: manyToCamelCase(result) });
});

export default deleteRole;
