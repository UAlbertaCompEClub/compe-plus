import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';
import type * as s from 'zapatos/schema';

import * as auth0Repository from '../../repositories/auth0Repository';
import * as userRepository from '../../repositories/userRepository';
import Role from '../../types/roles';
import { toSnakeCase } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAValidUrl } from '../validation';

type ReqBody = Omit<CamelCasedProperties<s.users.JSONSelectable>, 'createdAt' | 'updatedAt'>;

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        this.ruleFor('id').notNull().notEmpty();

        this.ruleFor('email')
            .notNull()
            .notEmpty()
            .emailAddress()
            .matches(new RegExp(/^.*@ualberta\.ca$/));

        this.ruleFor('ccid').notNull().notEmpty();

        this.ruleFor('program').notNull().notEmpty();

        this.ruleFor('year').notNull().greaterThan(0);

        this.ruleFor('givenName').notNull().notEmpty();

        this.ruleFor('familyName').notNull().notEmpty();

        this.ruleFor('fullName').notNull().notEmpty();

        this.ruleFor('photoUrl')
            .mustAsync(beAValidUrl)
            .when((reqBody) => reqBody.photoUrl !== undefined);
    }
}

type ResBody = { user: s.users.JSONSelectable };

/**
 * Register a new user.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns The newly registered user.
 */
const postUser = controller(async (req: Request<unknown, ResBody, ReqBody>, res: Response<ResBody>): Promise<void> => {
    await new ReqBodyValidator().validateAndThrow(req.body);

    // Make sure that the user isn't already registered
    const matches = await userRepository.get(req.body.id);
    if (matches.length > 0) {
        res.status(409).json({ user: matches[0] });
        return;
    }

    // By default give the user the Student role in Auth0
    await auth0Repository.giveUserRole(req.body.id, Role.Student);

    // Add the user to postgres with the appropriate roles
    const results = await userRepository.create(toSnakeCase(req.body));

    res.status(201).json({ user: results[0] });
});

export default postUser;
