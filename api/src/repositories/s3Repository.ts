import S3 from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk/global';

import InternalServerErrorException from '../exceptions/InternalServerErrorException';
import config from '../util/config';

// TODO: Research if we can avoid generating the s3 service object on every call to the repository.
// After much googling I still haven't found an answer to this. I'm leaving it as is for now despite
// the performance cost to avoid needing to debug weird race conditions.

/**
 * Helper function to generate service object.
 * @returns S3 service object.
 */
const generateServiceObject = (): S3 => {
    if (config.s3.endpoint !== '') {
        return new S3({
            accessKeyId: config.s3.access_key_id,
            secretAccessKey: config.s3.secret_access_key,
            region: config.s3.aws_region,
            endpoint: new AWS.Endpoint(config.s3.endpoint),
        });
    }
    return new S3({
        accessKeyId: config.s3.access_key_id,
        secretAccessKey: config.s3.secret_access_key,
        region: config.s3.aws_region,
    });
};

/**
 * Upload a file to S3 storage.
 * @param key Key to storage location.
 * @param data Data to write to storage.
 * @param encoding How data is encoded.
 */
const upload = async (key: string, data: string, encoding: BufferEncoding): Promise<void> => {
    const s3 = generateServiceObject();

    await s3.putObject({ Bucket: config.s3.bucket_name, Key: key, Body: Buffer.from(data, encoding) }).promise();
};

/**
 * Download a file from S3 storage.
 * @param key Key to storage location.
 * @param encoding Encoding to return file in.
 */
const download = async (key: string, encoding: BufferEncoding): Promise<string> => {
    const s3 = generateServiceObject();

    try {
        const result = await s3.getObject({ Bucket: config.s3.bucket_name, Key: key }).promise();
        return result.Body ? result.Body.toString(encoding) : '';
    } catch (err) {
        if (err.code === 'NoSuchKey') {
            throw new InternalServerErrorException({ issue: 'No document found in S3 for document in DB', key: key }, err);
        }
        throw new InternalServerErrorException({ issue: 'Something went wrong while downloading document from S3' }, err);
    }
};

export { download, upload };
