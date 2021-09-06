import { Request, Response } from 'express';
import { CamelCasedProperties } from 'type-fest';
import type * as s from 'zapatos/schema';

import * as calendlyRepository from '../../repositories/calendlyRepository';
import { decodeQueryToUser, manyToCamelCase } from '../../util/helper';
import controller from '../controllerUtil';
import Validator, { beAValidUuid, beProperlyUriEncoded } from '../validation';

type ReqQuery = {
    id?: string;
    interviewer?: string;
};

class ReqQueryValidator extends Validator<ReqQuery> {
    constructor() {
        super('query parameters');

        this.ruleFor('id')
            .mustAsync(beAValidUuid)
            .when((reqQuery) => reqQuery.id !== undefined);

        this.ruleFor('interviewer')
            .mustAsync(beProperlyUriEncoded)
            .when((reqQuery) => reqQuery.interviewer !== undefined);
    }
}

type ResBody = {
    calendlys: CamelCasedProperties<s.calendlys.JSONSelectable>[];
};

/**
 * Get all calendlys.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns All calendlys.
 */
const getCalendlys = controller(async (req: Request<unknown, ResBody, unknown, ReqQuery>, res: Response<ResBody>): Promise<void> => {
    await new ReqQueryValidator().validateAndThrow(req.query);

    const id = req.query.id;
    const interviewer = decodeQueryToUser(req.query.interviewer);

    const calendlys = await calendlyRepository.get(id, interviewer);

    res.status(200).json({ calendlys: manyToCamelCase(calendlys) });
});

export default getCalendlys;
