import { createAsyncThunk } from '@reduxjs/toolkit';

import postWithToken from '../../../../util/auth0/postWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { resumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { ResumeReview } from '../../../../util/serverResponses';

export type InitiateResumeReviewParams = {
    reviewee: string;
    tokenAcquirer: TokenAcquirer;
};

type ResumeReviewBody = {
    reviewee: string;
};

const initiateResumeReview = async (params: InitiateResumeReviewParams) => {
    const res = await postWithToken<ResumeReviewBody, ResumeReview>(resumeReviews, params.tokenAcquirer, [Scope.CreateResumeReviews], {
        reviewee: params.reviewee,
    });

    return res;
};

export default createAsyncThunk('resumeReview/initiate', initiateResumeReview);
