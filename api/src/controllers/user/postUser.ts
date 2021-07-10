import axios from 'axios';
import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import * as auth0Repository from '../../repositories/auth0Repository';
import * as userRepository from '../../repositories/userRepository';
import Role from '../../types/roles';
import controller from '../controllerUtil';
import Validator, { beAValidUrl } from '../validation';

type ReqBody = {
    user: string;
    email: string;
    ccid: string;
    program: string;
    year: number;
    givenName: string;
    familyName: string;
    fullName: string;
    photoUrl: string; // TODO can be undefined?
};

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        this.ruleFor('user').notNull().notEmpty();

        this.ruleFor('email')
            .emailAddress()
            .matches(new RegExp(/^.*@ualberta\.ca$/));

        this.ruleFor('ccid').notNull().notEmpty();

        this.ruleFor('program').notNull().notEmpty();

        this.ruleFor('year').greaterThan(0);

        this.ruleFor('givenName').notNull().notEmpty();

        this.ruleFor('familyName').notNull().notEmpty();

        this.ruleFor('fullName').notNull().notEmpty();

        this.ruleFor('photoUrl').mustAsync(beAValidUrl);
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
    const matches = await userRepository.get(req.body.user);
    if (matches.length > 0) {
        res.status(409).json({ user: matches[0] });
        return;
    }

    // By default give the user the Student role in Auth0
    await auth0Repository.giveUserRole(req.body.user, Role.Student);

    // Add the user to postgres with the appropriate roles
    // TODO

    res.status(201).json({ user: matches[0] }); // TODO return proper thing
});

export default postUser;
