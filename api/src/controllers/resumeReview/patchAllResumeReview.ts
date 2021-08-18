import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import InternalServerErrorException from '../../exceptions/InternalServerErrorException';
import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import controller from '../controllerUtil';
import Validator, { beAResumeReviewState, beAValidResumeReview, beAValidUser, beAValidUuid } from '../validation';

type Params = {
    resumeReview: string;
};

class ParamsValidator extends Validator<Params> {
    constructor() {
        super('route parameters');

        this.ruleFor('resumeReview').mustAsync(beAValidUuid).mustAsync(beAValidResumeReview);
    }
}

type ReqBody = {
    reviewee?: string;
    reviewer?: string;
    state?: s.resume_review_state;
};

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        this.ruleFor('reviewee')
            .mustAsync(beAValidUser)
            .when((reqBody) => reqBody.reviewee !== undefined);

        this.ruleFor('reviewer')
            .mustAsync(beAValidUser)
            .when((reqBody) => reqBody.reviewer !== undefined);

        this.ruleFor('state')
            .mustAsync(beAResumeReviewState)
            .when((reqBody) => reqBody.state !== undefined);
    }
}

/**
 * Update any resume review.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Nothing.
 */
const patchAllResumeReview = controller(async (req: Request<Params, unknown, ReqBody>, res: Response): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);
    await new ReqBodyValidator().validateAndThrow(req.body);

    try {
        await resumeReviewRepository.update(req.params.resumeReview, req.body.reviewee, req.body.reviewer, req.body.state);
    } catch (err) {
        throw new InternalServerErrorException({ issue: 'Failed to update reviewee, reviewer or state. Try again with same data.' }, err);
    }

    res.status(204).end();
});

export default patchAllResumeReview;
