// import * as db from 'zapatos/db';
// import { conditions as dc } from 'zapatos/db';
// import type * as s from 'zapatos/schema';

// import pool from '../util/pool';

// /**
//  * Get resume reviews. Filter as necessary.
//  * @param id Optional resume review id to filter by.
//  * @param reviewee Optional reviewee to filter by.
//  * @param reviewer Optional reviewer to filter by.
//  * @param state Optional state to filter by.
//  * @returns List of resume reviews appropriately filtered.
//  */
// const get = async (id?: string, reviewee?: string, reviewer?: string, state?: s.resume_review_state): Promise<s.resume_reviews.JSONSelectable[]> => {
//     const where: s.resume_reviews.Whereable = {};
//     if (id) {
//         where.id = dc.eq(id);
//     }
//     if (reviewee) {
//         where.reviewee_id = dc.eq(reviewee);
//     }
//     if (reviewer) {
//         where.reviewer_id = dc.eq(reviewer);
//     }
//     if (state) {
//         where.state = dc.eq(state);
//     }
//     return db.select('resume_reviews', where).run(pool);
// };

// /**
//  * Create a new resume review.
//  * @param reviewee Reviewee id for new resume review.
//  * @param state State of new resume review.
//  * @returns The newly created resume review.
//  */
// const create = async (reviewee: string, state: s.resume_review_state): Promise<s.resume_reviews.JSONSelectable> => {
//     return db.insert('resume_reviews', { reviewee_id: reviewee, state: state }).run(pool);
// };

// export { create, get };

// // TODO

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
