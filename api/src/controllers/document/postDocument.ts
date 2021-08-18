import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';
import type * as s from 'zapatos/schema';

import InternalServerErrorException from '../../exceptions/InternalServerErrorException';
import * as documentRepository from '../../repositories/documentRepository';
import * as s3Repository from '../../repositories/s3Repository';
import { documentS3Key, toCamelCase } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAValidResumeReview, beAValidUser, beAValidUuid, beProperlyBase64Encoded } from '../validation';

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
    note: string;
    isReview: boolean;
    userId: string;
    base64Contents: string;
};

class ReqBodyValidator extends Validator<ReqBody> {
    constructor() {
        super('message body');

        this.ruleFor('note').notNull();

        this.ruleFor('isReview').notNull();

        this.ruleFor('userId').mustAsync(beAValidUser); // TODO this should match the user creating it

        this.ruleFor('base64Contents').mustAsync(beProperlyBase64Encoded);
    }
}

type ResBody = { document: CamelCasedProperties<s.documents.JSONSelectable> };

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
    try {
        await s3Repository.upload(documentS3Key(req.params.resumeReview, document.id), req.body.base64Contents, 'base64');
    } catch (err) {
        await documentRepository.remove(document.id);
        throw new InternalServerErrorException({ issue: 'Failed to upload document to S3' }, err);
    }

    res.status(201).json({ document: toCamelCase(document) });
});

export default postDocument;
