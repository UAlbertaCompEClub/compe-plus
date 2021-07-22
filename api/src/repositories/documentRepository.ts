import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
import type * as s from 'zapatos/schema';

import pool from '../util/pool';

/**
 * Create a new document.
 * @param note Note associated with document.
 * @param isReview Is the document a review.
 * @param userId User who owns document.
 * @param resumeReviewId Resume review document is associated with.
 * @returns The newly created document.
 */
const create = async (note: string, isReview: boolean, userId: string, resumeReviewId: string): Promise<s.documents.JSONSelectable> => {
    return db.insert('documents', { note: note, is_review: isReview, user_id: userId, resume_review_id: resumeReviewId }).run(pool);
};

/**
 * Remove a document.
 * @param id Id of document to remove.
 * @returns The information for the removed document.
 */
const remove = async (id: string): Promise<s.documents.JSONSelectable[]> => {
    const where: s.documents.Whereable = { id: dc.eq(id) };
    return db.deletes('documents', where).run(pool);
};

/**
 * Get documents. Filter as necessary.
 * @param id Optional document id to filter by.
 * @param resumeReviewId Optional resume review id to filter by.
 * @param userId Optional user id to filter by.
 * @param isReview Option to filter by if it is a review.
 * @returns List of documents appropriately filtered.
 */
const get = async (id?: string, resumeReviewId?: string, userId?: string, isReview?: boolean): Promise<s.documents.JSONSelectable[]> => {
    const where: s.documents.Whereable = {};
    if (id) {
        where.id = dc.eq(id);
    }
    if (resumeReviewId) {
        where.resume_review_id = dc.eq(resumeReviewId);
    }
    if (userId) {
        where.user_id = dc.eq(userId);
    }
    if (isReview) {
        where.is_review = dc.eq(isReview);
    }
    return db.select('documents', where).run(pool);
};

/**
 * Update a document.
 * @param id Id of document to update.
 * @param note Value to update note to.
 * @returns Updated document.
 */
const update = async (id: string, note?: string): Promise<s.documents.JSONSelectable[]> => {
    const where: s.documents.Whereable = { id: dc.eq(id) };
    return db.update('documents', { note: note }, where).run(pool);
};

export { create, get, remove, update };
