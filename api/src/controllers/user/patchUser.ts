import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';
import type * as s from 'zapatos/schema';

import NotAuthorizedException from '../../exceptions/NotAuthorizedException';
import * as userRepository from '../../repositories/userRepository';
import { toSnakeCase } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAValidUser, beProperlyUriEncoded } from '../validation';

type Params = {
    id: string;
};

class ParamsValidator extends Validator<Params> {
    constructor() {
        super('route parameters');

        this.ruleFor('id').mustAsync(beProperlyUriEncoded).mustAsync(beAValidUser);
    }
}

type ReqBody = Pick<CamelCasedProperties<s.users.Updatable>, 'hasAgreedToTermsOfService'>;

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        this.ruleFor('hasAgreedToTermsOfService').notNull();
    }
}

const patchUser = controller(async (req: Request<Params, unknown, ReqBody>, res: Response): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);
    await new ReqBodyValidator().validateAndThrow(req.body);

    const claimedUserId = decodeURIComponent(req.params.id);

    if (req.user.sub !== claimedUserId) {
        throw new NotAuthorizedException();
    }

    await userRepository.update(req.user.sub, toSnakeCase(req.body));

    res.status(204).end();
});

export default patchUser;
