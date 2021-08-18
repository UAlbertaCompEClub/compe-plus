import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
import type * as s from 'zapatos/schema';

import pool from '../util/pool';

/**
 * Get roles associated to user. Filter as necessary.
 * @param id User id.
 * @returns List of users appropriately filtered.
 */
const get = async (id: string): Promise<s.user_roles.JSONSelectable[]> => {
    const where: s.user_roles.Whereable = {
        user_id: dc.eq(id),
    };
    return db.select('user_roles', where).run(pool);
};

export { get };
