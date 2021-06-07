import { Request, Response, NextFunction } from 'express';
import type * as s from 'zapatos/schema';
import NotImplementedException from '../../exceptions/NotImplementedException';
import controller from '../controllerUtil';
import { validate as uuidValidate } from 'uuid';
import Validator from '../validation';

type Params = Record<string, unknown>;

type ReqBody = s.resume_reviews.Insertable;

type ResBody = s.resume_reviews.Selectable;

const postResumeReview = controller(async (req: Request<Params, ResBody, ReqBody>, res: Response<ResBody>): Promise<void> => {
    throw new NotImplementedException('postResumeReview');

    // TODO validate ReqBody

    // TODO use repository to create a new resume review

    // TODO return new resume review
});

export default postResumeReview;

// TODO implement this file
