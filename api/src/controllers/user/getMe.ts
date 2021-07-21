import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

import * as userRepository from '../../repositories/userRepository';
import controller from '../controllerUtil';

type ResBody = {
    user: s.users.JSONSelectable;
};

/**
 * Get my resume reviews.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Your resume reviews.
 */
const getMe = controller(async (req: Request, res: Response<ResBody>): Promise<void> => {
    const id = req.user.sub;
    const matches = await userRepository.get(id);

    const userExists = matches.length == 1;

    if (!userExists) {
        res.status(404);
    }

    res.status(200).json({ user: matches[0] });
});

export default getMe;
