import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import NotImplementedException from '../../exceptions/NotImplementedException';
import controller from '../controllerUtil';

type Params = Record<string, unknown>;

type ReqBody = s.resume_reviews.Insertable;

type ResBody = s.resume_reviews.Selectable;

const postResumeReview = controller(async (req: Request<Params, ResBody, ReqBody>, res: Response<ResBody>): Promise<void> => {
    throw new NotImplementedException('postResumeReview');

    // Just to use req and res and remove lints
    req.body;
    res.send();

    // TODO validate ReqBody

    // TODO use repository to create a new resume review

    // TODO return new resume review
});

export default postResumeReview;

// TODO implement this file
