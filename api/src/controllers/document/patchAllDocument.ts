import { Request, Response } from 'express';

import InternalServerErrorException from '../../exceptions/InternalServerErrorException';
import * as documentRepository from '../../repositories/documentRepository';
import * as s3Repository from '../../repositories/s3Repository';
import { documentS3Key } from '../../util/helper';
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

/**
 * Update any document.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Nothing.
 */
const patchAllDocument = controller(async (req: Request<Params, unknown, ReqBody>, res: Response): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);
    await new ReqBodyValidator().validateAndThrow(req.body);

    try {
        if (req.body.note !== null && req.body.note !== undefined) {
            await documentRepository.update(req.params.document, req.body.note);
        }
        if (req.body.base64Contents !== null && req.body.base64Contents !== undefined) {
            await s3Repository.upload(documentS3Key(req.params.resumeReview, req.params.document), req.body.base64Contents, 'base64');
        }
    } catch (err) {
        throw new InternalServerErrorException({ issue: 'Failed to update note or base64Contents. Try again with same data.' }, err);
    }

    res.status(204).end();
});

export default patchAllDocument;
