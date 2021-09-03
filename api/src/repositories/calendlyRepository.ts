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

/**
 * Update a calendly.
 * @param id Id of calendly to update.
 * @param link Value to update Calendly link.
 * @param interviewer Value to update interviewer to.
 * @param interviewee Value to update interviewee to.
 * @returns Updated calendly.
 */
const update = async (id: string, link?: string, interviewer?: string, interviewee?: string): Promise<s.calendlys.JSONSelectable[]> => {
    const where: s.calendlys.Whereable = { id: dc.eq(id) };
    const colOptions: s.calendlys.Updatable = {};
    if (link !== undefined && link !== null) {
        colOptions.link = link;
    }
    if (interviewer !== undefined && interviewer !== null) {
        colOptions.interviewer = interviewer;
    }
    if (interviewee !== undefined && interviewee !== null) {
        colOptions.interviewee = interviewee;
    }
    console.log(db.update('calendlys', colOptions, where).compile());
    return db.update('calendlys', colOptions, where).run(pool);
};

export { create, get, update };
