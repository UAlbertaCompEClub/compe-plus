import * as db from 'zapatos/db';
import { conditions as dc } from 'zapatos/db';
import type * as s from 'zapatos/schema';
import { role_type } from 'zapatos/schema';

import pool from '../util/pool';

type userRoleSQL = s.users.SQL | s.user_roles.SQL;
export type userRoleSelectable = s.users.JSONSelectable & { user_role: role_type };

/**
 * Gets all users and their roles.
 * @returns List of all users and their assigned roles.
 */
const getUsersInfo = async (): Promise<userRoleSelectable[]> => {
    return db.sql<userRoleSQL, userRoleSelectable[]>`
    SELECT ${'users'}.*
    FROM ${'users'}
    JOIN ${'user_roles'}
    ON ${'users'}.${'id'} = ${'user_roles'}.${'id'}
    `.run(pool);
};

export { getUsersInfo };
