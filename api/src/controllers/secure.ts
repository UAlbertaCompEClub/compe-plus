import { Request, Response } from 'express';

const getReviews = async (req: Request, res: Response): Promise<Response> => {
    req.log.debug('Get reviews route called.');

    return res.status(200).json([
        {
            requester: 'Alice',
            resume: null,
        },
        {
            requester: 'Bob',
            resume: null,
        },
        {
            requester: 'Charlie',
            resume: null,
        },
    ]);
};

export default { getReviews };
