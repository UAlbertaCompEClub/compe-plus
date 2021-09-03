import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
import type * as s from 'zapatos/schema';

import pool from '../util/pool';

/**
 * Get roles associated to user.
 * @param id User id.
 */
const get = async (id: string): Promise<s.user_roles.JSONSelectable[]> => {
    const where: s.user_roles.Whereable = {
        user_id: dc.eq(id),
    };
    return db.select('user_roles', where).run(pool);
};

/**
 * Give a user a new role.
 * @param user_role User id and role.
 */
const assign = async (user_role: s.user_roles.Insertable): Promise<s.user_roles.JSONSelectable> => {
    return db.insert('user_roles', { user_id: user_role.user_id, role: user_role.role }).run(pool);
};

const remove = async (user_role: s.user_roles.Insertable): Promise<s.user_roles.JSONSelectable[]> => {
    return db.deletes('user_roles', { user_id: user_role.user_id, role: user_role.role }).run(pool);
};

export { assign, get, remove };
