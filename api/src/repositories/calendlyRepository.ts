import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
import type * as s from 'zapatos/schema';

import pool from '../util/pool';

/**
 * Get calendlys. Filter as necessary.
 * @param id Optional calendly id to filter by.
 * @param interviewer Optional interviewer to filter by.
 * @param interviewee Optional interviewee to filter by.
 * @returns List of calendlys appropriately filtered.
 */
const get = async (id?: string, interviewer?: string, interviewee?: string): Promise<s.calendlys.JSONSelectable[]> => {
    const where: s.calendlys.Whereable = {};
    if (id) {
        where.id = dc.eq(id);
    }
    if (interviewer) {
        where.interviewer = dc.eq(interviewer);
    }
    if (interviewee) {
        where.interviewee = dc.eq(interviewee);
    }

    return db.select('calendlys', where).run(pool);
};

/**
 * Create a new calendly.
 * @param link Calendly link.
 * @param interviewer Interviewer whose calendly this is.
 * @returns The newly created calendly.
 */
const create = async (link: string, interviewer: string): Promise<s.calendlys.JSONSelectable> => {
    return db.insert('calendlys', { link, interviewer }).run(pool);
};

export { create, get };
