import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import InternalServerErrorException from '../../exceptions/InternalServerErrorException';
import NotAuthorizedException from '../../exceptions/NotAuthorizedException';
import * as documentRepository from '../../repositories/documentRepository';
import * as s3Repository from '../../repositories/s3Repository';
import controller from '../controllerUtil';
import Validator, { beAValidDocument, beAValidResumeReview, beAValidUuid, beProperlyBase64Encoded } from '../validation';

type Params = {
    resumeReview: string;
    document: string;
};

class ParamsValidator extends Validator<Params> {
    constructor() {
        super('route parameters');

        this.ruleFor('resumeReview').mustAsync(beAValidUuid).mustAsync(beAValidResumeReview);

        this.ruleFor('document').mustAsync(beAValidUuid).mustAsync(beAValidDocument);
    }
}

type ReqBody = {
    note?: string;
    base64Contents?: string;
};

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        this.ruleFor('base64Contents')
            .mustAsync(beProperlyBase64Encoded)
            .when((reqBody) => reqBody.base64Contents !== undefined);
    }
}

type ResBody = { document: s.documents.JSONSelectable };

/**
 * Update my document.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Nothing.
 */
const patchMyDocument = controller(async (req: Request<Params, ResBody, ReqBody>, res: Response<ResBody>): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);
    await new ReqBodyValidator().validateAndThrow(req.body);

    // Make sure that the calling user is associated with the document
    if ((await documentRepository.get(req.params.document, undefined, req.user.sub)).length === 0) {
        throw new NotAuthorizedException();
    }

    try {
        if (req.body.note !== null && req.body.note !== undefined) {
            await documentRepository.update(req.params.document, req.body.note);
        }
        if (req.body.base64Contents !== null && req.body.base64Contents !== undefined) {
            const key = `resume-reviews/${req.params.resumeReview}/documents/${req.params.document}`;
            await s3Repository.upload(key, req.body.base64Contents, 'base64');
        }
    } catch (err) {
        throw new InternalServerErrorException({ issue: 'Failed to update note or base64Contents. Try again with same data.' }, err);
    }

    res.status(204).end();
});

export default patchMyDocument;
