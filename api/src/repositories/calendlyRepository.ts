import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';

import pool from '../util/pool';

/**
 * Create a new calendly.
 * @param link Calendly link.
 * @param interviewer Interviewer whose calendly this is.
 * @returns The newly created calendly.
 */
const create = async (link: string, interviewer: string): Promise<s.calendlys.JSONSelectable> => {
    return db.insert('calendlys', { link, interviewer }).run(pool);
};

export { create };
