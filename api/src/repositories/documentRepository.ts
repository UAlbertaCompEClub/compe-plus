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

export { create, remove };
