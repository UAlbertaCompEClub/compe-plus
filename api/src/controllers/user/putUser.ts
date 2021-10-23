import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';
import type * as s from 'zapatos/schema';

import * as userRepository from '../../repositories/userRepository';
import { toSnakeCase } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAValidUser } from '../validation';

type ReqBody = Pick<CamelCasedProperties<s.users.Updatable>, 'hasAgreedToTermsOfService'> & Pick<CamelCasedProperties<s.users.Selectable>, 'id'>;

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        this.ruleFor('id').mustAsync(beAValidUser);

        this.ruleFor('hasAgreedToTermsOfService').notNull();
    }
}

type ResBody = { user: s.users.JSONSelectable };

const putUser = controller(async (req: Request<unknown, ResBody, ReqBody>, res: Response<ResBody>): Promise<void> => {
    await new ReqBodyValidator().validateAndThrow(req.body);

    await userRepository.update(req.body.id, toSnakeCase(req.body));

    res.status(204).end();
});

export default putUser;
