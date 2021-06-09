import type * as s from 'zapatos/schema';
import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
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
    return await db.select('resume_reviews', where).run(pool);
};

// TODO handle db exceptions

export { get };
