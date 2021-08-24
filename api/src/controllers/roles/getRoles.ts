import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import * as userRolesRepository from '../../repositories/userRolesRepository';
import { decodeQueryToUser } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAValidUser } from '../validation';

type Params = {
    userId: string;
};

class ParamsValidator extends Validator<Params> {
    constructor() {
        super('route parameters');

        this.ruleFor('userId').mustAsync(beAValidUser);
    }
}

type ResBody = { roles: s.user_roles.JSONSelectable[] };

/**
 * Get my documents.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns My documents.
 */
const getRoles = controller(async (req: Request<Params>, res: Response<ResBody>): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);

    const userId = decodeQueryToUser(req.params.userId) ?? '';

    const userRoles = await userRolesRepository.get(userId);

    res.status(200).json({ roles: userRoles });
});

export default getRoles;
