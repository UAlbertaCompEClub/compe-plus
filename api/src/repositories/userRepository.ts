import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
import type * as s from 'zapatos/schema';

import pool from '../util/pool';

/**
 * Get users. Filter as necessary.
 * @param id User id.
 * @returns List of users appropriately filtered.
 */
const get = async (id: string): Promise<s.users.JSONSelectable[]> => {
    const where: s.users.Whereable = {
        id: dc.eq(id),
    };
    return db.select('users', where).run(pool);
};

/**
 * Create user. Gives the user the student role.
 * @param user User data.
 */
const create = async (user: s.users.Insertable): Promise<[s.users.JSONSelectable, s.user_roles.JSONSelectable]> => {
    return db.serializable(pool, (txnClient) => Promise.all([db.insert('users', user).run(txnClient), db.insert('user_roles', { user_id: user.id, role: 'student' }).run(txnClient)]));
};

const update = async (id: string, user: s.users.Updatable): Promise<s.users.JSONSelectable[]> => {
    const where: s.users.Whereable = {
        id: dc.eq(id),
    };
    const value: s.users.Updatable = {
        has_agreed_to_terms_of_service: user.has_agreed_to_terms_of_service,
    };
    return db.update('users', value, where).run(pool);
};

export { create, get, update };
