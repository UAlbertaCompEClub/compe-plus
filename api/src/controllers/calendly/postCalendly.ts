import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';
import type * as s from 'zapatos/schema';

import * as calendlyRepository from '../../repositories/calendlyRepository';
import { toCamelCase } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAValidUser, beProperlyUriEncoded } from '../validation';

// Can't define interviewees at creation b/c the assumption is that a interviewee is selected later
type ReqBody = {
    link: string;
    interviewer: string;
};

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        this.ruleFor('link').matches(/^https:\/\/calendly\.com\/.+$/);

        this.ruleFor('interviewer').mustAsync(beProperlyUriEncoded).mustAsync(beAValidUser);
    }
}

type ResBody = { calendly: CamelCasedProperties<s.calendlys.JSONSelectable> };

/**
 * Create a new calendly.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Newly created calendly.
 */
const postCalendly = controller(async (req: Request<unknown, ResBody, ReqBody>, res: Response<ResBody>): Promise<void> => {
    await new ReqBodyValidator().validateAndThrow(req.body);

    const link = req.body.link;
    const interviewer = decodeURIComponent(req.body.interviewer);

    const newCalendly = await calendlyRepository.create(link, interviewer);

    res.status(201).json({ calendly: toCamelCase(newCalendly) });
});

export default postCalendly;
