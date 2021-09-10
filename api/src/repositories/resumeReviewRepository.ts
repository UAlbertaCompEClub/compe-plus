import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
import type * as s from 'zapatos/schema';

import pool from '../util/pool';

/**
 * Get resume reviews. Filter as necessary.
 * @param id Optional resume review id to filter by.
 * @param reviewee Optional reviewee to filter by.
 * @param reviewer Optional reviewer to filter by.
 * @param state Optional state to filter by.
 * @returns List of resume reviews appropriately filtered.
 */
const get = async (id?: string, reviewee?: string, reviewer?: string, state?: s.resume_review_state): Promise<s.resume_reviews.JSONSelectable[]> => {
    const where: s.resume_reviews.Whereable = {};
    if (id) {
        where.id = dc.eq(id);
    }
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

type ResumeReviewWithUserDetails = s.resume_reviews.JSONSelectable & {
    reviewer: s.users.JSONSelectable;
    reviewee: s.users.JSONSelectable;
};

const getWithUserDetails = async (id?: string, reviewee?: string, reviewer?: string, state?: s.resume_review_state): Promise<ResumeReviewWithUserDetails[]> => {
    const where: s.resume_reviews.Whereable = {};
    if (id) {
        where.id = dc.eq(id);
    }
    if (reviewee) {
        where.reviewee_id = dc.eq(reviewee);
    }
    if (reviewer) {
        where.reviewer_id = dc.eq(reviewer);
    }
    if (state) {
        where.state = dc.eq(state);
    }

    return db
        .select('resume_reviews', where, {
            lateral: {
                reviewee: db.selectExactlyOne('users', { id: db.parent('reviewee_id') }),
                reviewer: db.selectExactlyOne('users', { id: db.parent('reviewer_id') }),
            },
        })
        .run(pool);
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

/**
 * Update a resume review.
 * @param id Id of resume review to update.
 * @param reviewee Value to update reviewee to.
 * @param reviewer Value to update reviewer to.
 * @param state Value to update state to.
 * @returns Updated resume review.
 */
const update = async (id: string, reviewee?: string, reviewer?: string, state?: s.resume_review_state): Promise<s.resume_reviews.JSONSelectable[]> => {
    const where: s.resume_reviews.Whereable = { id: dc.eq(id) };
    const colOptions: s.resume_reviews.Updatable = {};
    if (reviewee !== undefined && reviewee !== null) {
        colOptions.reviewee_id = reviewee;
    }
    if (reviewer !== undefined && reviewer !== null) {
        colOptions.reviewer_id = reviewer;
    }
    if (state !== undefined && state !== null) {
        colOptions.state = state;
    }
    return db.update('resume_reviews', colOptions, where).run(pool);
};

export { create, get, getWithUserDetails, update };
