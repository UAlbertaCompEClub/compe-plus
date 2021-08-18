import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';
import type * as s from 'zapatos/schema';

import * as resumeReviewRepository from '../../repositories/resumeReviewRepository';
import { toCamelCase } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAValidUser, beProperlyUriEncoded } from '../validation';

// Can't define reviewer at creation b/c the assumption is that a reviewer is selected later
// Can't choose the starting state b/c the assumption is that a resume review starts in the 'seeking_reviewer' state
type ReqBody = {
    reviewee: string;
};

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        this.ruleFor('reviewee').mustAsync(beProperlyUriEncoded).mustAsync(beAValidUser);
    }
}

type ResBody = { resumeReview: CamelCasedProperties<s.resume_reviews.JSONSelectable> };

/**
 * Create a new resume review.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Newly created resume review.
 */
const postResumeReview = controller(async (req: Request<unknown, ResBody, ReqBody>, res: Response<ResBody>): Promise<void> => {
    await new ReqBodyValidator().validateAndThrow(req.body);

    const reviewee = decodeURIComponent(req.body.reviewee);

    const newResumeReview = await resumeReviewRepository.create(reviewee, 'seeking_reviewer');

    res.status(201).json({ resumeReview: toCamelCase(newResumeReview) });
});

export default postResumeReview;
