import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import controller from '../controllerUtil';
import Validator, { beAValidUser, beAValidUuid } from '../validation';

// Can't define reviewer at creation b/c the assumption is that a reviewer is selected later
// Can't choose the starting state b/c the assumption is that a resume review starts in the 'seeking_reviewer' state
type ReqBody = {
    reviewee: string;
};

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        this.ruleFor('reviewee').mustAsync(beAValidUuid).mustAsync(beAValidUser);
    }
}

type ResBody = { resumeReview: s.resume_reviews.JSONSelectable };

/**
 * Create a new resume review.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns HTTP response.
 */
const postResumeReview = controller(async (req: Request<unknown, ResBody, ReqBody>, res: Response<ResBody>): Promise<void> => {
    await new ReqBodyValidator().validateAndThrow(req.body);

    const newResumeReview = await resumeReviewRepository.create(req.body.reviewee, 'seeking_reviewer');

    res.status(201).json({ resumeReview: newResumeReview });
});

export default postResumeReview;
