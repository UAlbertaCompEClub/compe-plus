import S3 from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk/global';

import config from '../util/config';

// TODO: Research if we can avoid generating the s3 service object on every call to the repository.
// After much googling I still haven't found an answer to this. I'm leaving it as is for now despite
// the performance cost to avoid needing to debug weird race conditions.

/**
 * Helper function to generate service object.
 * @returns S3 service object.
 */
const generateServiceObject = (): S3 => {
    if (config.bucketeer.endpoint !== '') {
        return new S3({
            accessKeyId: config.bucketeer.aws_access_key_id,
            secretAccessKey: config.bucketeer.aws_secret_access_key,
            region: config.bucketeer.aws_region,
            endpoint: new AWS.Endpoint(config.bucketeer.endpoint),
        });
    }
    return new S3({
        accessKeyId: config.bucketeer.aws_access_key_id,
        secretAccessKey: config.bucketeer.aws_secret_access_key,
        region: config.bucketeer.aws_region,
    });
};

/**
 * Upload a file to blob storage.
 * @param key Key to storage location.
 * @param data Data to write to storage.
 * @param encoding How data is encoded.
 */
const upload = async (key: string, data: string, encoding: BufferEncoding): Promise<void> => {
    const s3 = generateServiceObject();

    await s3.putObject({ Bucket: config.bucketeer.bucket_name, Key: key, Body: Buffer.from(data, encoding) }).promise();
};

/**
 * Download a file from blob storage.
 * @param key Key to storage location.
 * @param encoding Encoding to return file in.
 */
const download = async (key: string, encoding: BufferEncoding): Promise<string> => {
    // TODO what happens when key does not exist?
    const s3 = generateServiceObject();

    try {
        const result = await s3.getObject({ Bucket: config.bucketeer.bucket_name, Key: key }).promise();
        return result.Body ? result.Body.toString(encoding) : '';
    } catch (err) {
        return '';
    }
};

export { download, upload };
