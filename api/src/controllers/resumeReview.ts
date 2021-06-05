import { Request, Response } from 'express';
import type * as s from 'zapatos/schema';

type ResBody = {
    resumeReviews: s.resume_reviews.JSONSelectable[];
};

/**
 * Controller for getting resume reviews.
 * @param req HTTP request.
 * @param res HTTP response.
 * @returns HTTP response.
 */
const getResumeReviews = async (req: Request, res: Response<ResBody>): Promise<Response> => {
    // TODO
    return res.status(200).json({ resumeReviews: [] });
};

export default { getResumeReviews };

// TODO file for each individual controller?
