import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import BadRequestException from '../../exceptions/BadRequestException';
import * as documentRepository from '../../repositories/documentRepository';
import * as s3Repository from '../../repositories/s3Repository';
import { decodeQueryToUser, documentS3Key } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAValidResumeReview, beAValidUuid, beProperlyUriEncoded } from '../validation';

type Params = {
    resumeReview: string;
};

class ParamsValidator extends Validator<Params> {
    constructor() {
        super('route parameters');

        this.ruleFor('resumeReview').mustAsync(beAValidUuid).mustAsync(beAValidResumeReview);
    }
}

type ReqQuery = {
    id?: string;
    userId?: string;
    isReview?: boolean;
};

class ReqQueryValidator extends Validator<ReqQuery> {
    constructor() {
        super('query parameters');

        this.ruleFor('id')
            .mustAsync(beAValidUuid)
            .when((reqQuery) => reqQuery.id !== undefined);

        this.ruleFor('userId')
            .mustAsync(beProperlyUriEncoded)
            .when((reqQuery) => reqQuery.userId !== undefined);

        this.ruleFor('isReview')
            .notNull()
            .when((reqQuery) => reqQuery.isReview !== undefined);
    }
}

interface Document extends s.documents.JSONSelectable {
    base64Contents: string;
}

type ResBody = { documents: Document[] };

/**
 * Get all documents.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns All documents.
 */
const getAllDocuments = controller(async (req: Request<Params, ResBody, unknown, ReqQuery>, res: Response<ResBody>): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);
    await new ReqQueryValidator().validateAndThrow(req.query);

    const id = req.query.id;
    const userId = decodeQueryToUser(req.query.userId);
    const isReview = req.query.isReview;

    const allDocuments = await documentRepository.get(id, req.params.resumeReview, userId, isReview);

    if (allDocuments.length > 6) {
        throw new BadRequestException({ issue: 'Cannot request more than 6 documents at once. Narrow your query.' });
    }

    const enhancedDocuments: Document[] = [];
    for (const d of allDocuments) {
        const document: Document = { ...d, base64Contents: '' };
        document.base64Contents = await s3Repository.download(documentS3Key(req.params.resumeReview, document.id), 'base64');
        enhancedDocuments.push(document);
    }

    res.status(200).json({ documents: enhancedDocuments });
});

export default getAllDocuments;
