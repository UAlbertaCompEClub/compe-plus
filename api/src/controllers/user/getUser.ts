import { Request, Response } from 'express';

import NotAuthorizedException from '../../exceptions/NotAuthorizedException';
import * as userRepository from '../../repositories/userRepository';
import { decodeQueryToUser } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beProperlyUriEncoded } from '../validation';

type ReqParams = {
    user: string;
};

class ReqParamsValidator extends Validator<ReqParams> {
    constructor() {
        super('path parameters');

        this.ruleFor('user').mustAsync(beProperlyUriEncoded);
    }
}

type ResBody = {
    exists: boolean;
};

/**
 * Get my resume reviews.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns Your resume reviews.
 */
const getUser = controller(async (req: Request<ReqParams, ResBody, unknown, unknown>, res: Response<ResBody>): Promise<void> => {
    await new ReqParamsValidator().validateAndThrow(req.params);

    const requested = decodeQueryToUser(req.params.user);
    const requester = req.user.sub;

    if (requester !== requested) {
        throw new NotAuthorizedException();
    }

    const matches = await userRepository.get(requested);

    res.status(200).json({ exists: matches.length == 1 });
});

export default getUser;
