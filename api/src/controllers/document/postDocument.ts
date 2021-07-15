import * as AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import * as blobRepository from '../../repositories/blobRepository';
import config from '../../util/config';
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

type ResBody = { document: Omit<s.documents.JSONSelectable, 'file_url'> };

/**
 * Create a new document.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Newly created document.
 */
const postDocument = controller(async (req: Request<Params, ResBody, ReqBody>, res: Response<ResBody>): Promise<void> => {
    await new ParamsValidator().validateAndThrow(req.params);
    await new ReqBodyValidator().validateAndThrow(req.body);

    // Decode contents and create file in s3
    // TODO
    console.log(req.body.base64Contents);
    const byteContents = Buffer.from(req.body.base64Contents, 'base64');
    // const byteContents = decode(req.body.base64Contents);
    const s3 = new S3({
        accessKeyId: config.bucketeer.aws_access_key_id,
        secretAccessKey: config.bucketeer.aws_secret_access_key,
        region: config.bucketeer.aws_region,
        endpoint: new AWS.Endpoint(config.bucketeer.endpoint), // TODO only configure when given
    });
    await s3.putObject({ Bucket: config.bucketeer.bucket_name, Key: req.params.resumeReview, Body: byteContents }).promise();

    // const r = await s3.getObject({ Bucket: config.bucketeer.bucket_name, Key: req.params.resumeReview }).promise();
    // if (r.Body) {
    //     console.log(r.Body.toString('base64'));
    // }

    // TODO

    // Create document resource in db
    // TODO

    res.status(201).end(); // TODO make right
});

export default postDocument;
