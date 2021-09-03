import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import InternalServerErrorException from '../../exceptions/InternalServerErrorException';
import * as calendlyRepository from '../../repositories/calendlyRepository';
import controller from '../controllerUtil';
import Validator, { beAValidCalendly, beAValidUser, beAValidUuid, beProperlyUriEncoded } from '../validation';

type Params = {
    calendly: string;
};

class ParamsValidator extends Validator<Params> {
    constructor() {
        super('route parameters');

        this.ruleFor('calendly').mustAsync(beAValidUuid).mustAsync(beAValidCalendly);
    }
}

type ReqBody = {
    link?: string;
    interviewer?: string;
    interviewee?: string;
};

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        this.ruleFor('link')
            .matches(/^https:\/\/calendly\.com\/.+$/)
            .when((reqBody) => reqBody.link !== undefined);

        this.ruleFor('interviewer')
            .mustAsync(beProperlyUriEncoded)
            .mustAsync(beAValidUser)
            .when((reqBody) => reqBody.interviewer !== undefined);

        this.ruleFor('interviewee')
            .mustAsync(beProperlyUriEncoded)
            .mustAsync(beAValidUser)
            .when((reqBody) => reqBody.interviewee !== undefined);
    }
}

/**
 * Update any calendly.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Nothing.
 */
const patchAllResumeReview = controller(async (req: Request<Params, unknown, ReqBody>, res: Response): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);
    await new ReqBodyValidator().validateAndThrow(req.body);

    console.log('body\n\n\n\n\n');
    console.log(req.body);

    try {
        await calendlyRepository.update(req.params.calendly, req.body.link, req.body.interviewer, req.body.interviewee);
    } catch (err) {
        throw new InternalServerErrorException({ issue: 'Failed to update link, interviewer, or interviewee. Try again with same data.' }, err);
    }

    res.status(204).end();
});

export default patchAllResumeReview;
