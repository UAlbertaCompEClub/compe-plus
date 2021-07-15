import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import InternalServerErrorException from '../../exceptions/InternalServerErrorException';
import * as blobRepository from '../../repositories/blobRepository';
import * as documentRepository from '../../repositories/documentRepository';
import controller from '../controllerUtil';
import Validator, { beAValidUuid } from '../validation';

type Params = {
    resumeReview: string;
};

class ParamsValidator extends Validator<Params> {
    constructor() {
        super('route parameters');

        this.ruleFor('resumeReview').mustAsync(beAValidUuid);
    }
}

type ReqBody = {
    note: string;
    isReview: boolean;
    userId: string;
    base64Contents: string; // TODO bad name?
};

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        // TODO
    }
}

type ResBody = { document: s.documents.JSONSelectable };

/**
 * Create a new document.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Newly created document.
 */
const postDocument = controller(async (req: Request<Params, ResBody, ReqBody>, res: Response<ResBody>): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);
    await new ReqBodyValidator().validateAndThrow(req.body);

    // Create document resource in db
    const document = await documentRepository.create(req.body.note, req.body.isReview, req.body.userId, req.params.resumeReview);

    // Decode contents and upload file to s3
    const key = `resume-reviews/${req.params.resumeReview}/documents/${document.id}`;
    try {
        await blobRepository.upload(key, Buffer.from(req.body.base64Contents, 'base64'));
    } catch (err) {
        await documentRepository.remove(document.id);
        throw new InternalServerErrorException({ issue: 'Failed to upload document to S3' }, err);
    }

    res.status(201).json({ document: document });
});

export default postDocument;
