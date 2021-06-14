import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
import type * as s from 'zapatos/schema';

import pool from '../util/pool';

/**
 * Get resume reviews. Filter as necessary.
 * @param reviewee Optional reviewee to filter by.
 * @param reviewer Optional reviewer to filter by.
 * @param state Optional state to filter by.
 * @returns List of resume reviews appropriately filtered.
 */
const get = async (reviewee?: string, reviewer?: string, state?: s.resume_review_state): Promise<s.resume_reviews.JSONSelectable[]> => {
    const where: s.resume_reviews.Whereable = {};
    if (reviewee) {
        where.reviewee_id = dc.eq(reviewee);
    }
    if (reviewer) {
        where.reviewer_id = dc.eq(reviewer);
    }
    if (state) {
        where.state = dc.eq(state);
    }
    return db.select('resume_reviews', where).run(pool);
};

/**
 * Create a new resume review.
 * @param reviewee Reviewee id for new resume review.
 * @param state State of new resume review.
 * @returns The newly created resume review.
 */
const create = async (reviewee: string, state: s.resume_review_state): Promise<s.resume_reviews.JSONSelectable> => {
    return db.insert('resume_reviews', { reviewee_id: reviewee, state: state }).run(pool);
};

export { create, get };
