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

export { get };
