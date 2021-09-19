import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import BadRequestException from '../../exceptions/BadRequestException';
import InternalServerErrorException from '../../exceptions/InternalServerErrorException';
import NotAuthorizedException from '../../exceptions/NotAuthorizedException';
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
 * Update my resume review.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Nothing.
 */
const patchMyResumeReview = controller(async (req: Request<Params, unknown, ReqBody>, res: Response): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);
    await new ReqBodyValidator().validateAndThrow(req.body);

    // Ensure that you can't claim a resume review claimed by someone else
    if (req.body.reviewer !== undefined) {
        const rr = await resumeReviewRepository.get(req.params.resumeReview);
        if (req.body.reviewer !== null && rr[0].reviewer_id !== null) {
            throw new BadRequestException({ issue: 'You must set the reviewer to null before you can change it to another user.' });
        }
    }

    // Make sure that the calling user is associated with the resume review
    if ((await resumeReviewRepository.get(req.params.resumeReview, req.user.sub)).length === 0 && (await resumeReviewRepository.get(req.params.resumeReview, undefined, req.user.sub)).length === 0) {
        throw new NotAuthorizedException();
    }

    try {
        await resumeReviewRepository.update(req.params.resumeReview, req.body.reviewee, req.body.reviewer, req.body.state);
    } catch (err) {
        throw new InternalServerErrorException({ issue: 'Failed to update reviewee, reviewer or state. Try again with same data.' }, err);
    }

    res.status(204).end();
});

export default patchMyResumeReview;
