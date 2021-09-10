import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken from '../../../../util/auth0/fetchWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { getResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedResumeReviewsWithDetails } from '../../../../util/serverResponses';
import { VolunteerDispatch, VolunteerState } from '../volunteerStore';

export type GetReviewingResumeReviewParams = {
    tokenAcquirer: TokenAcquirer;
    userId: string;
};

type AsyncThunkConfig = {
    state: VolunteerState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

export const getReviewingResumeReviews = async (params: GetReviewingResumeReviewParams): Promise<WrappedResumeReviewsWithDetails> => {
    const resumeReviewResult = await fetchWithToken<WrappedResumeReviewsWithDetails>(getResumeReviews, params.tokenAcquirer, [Scope.ReadAllResumeReviews], {
        state: 'reviewing',
        reviewer: encodeURIComponent(params.userId),
    }).catch(() => {
        throw new Error('Unable to fetch reviewing resume reviews');
    });
    return resumeReviewResult?.data ?? { resumeReviews: [] };
};

export default createAsyncThunk<WrappedResumeReviewsWithDetails, GetReviewingResumeReviewParams, AsyncThunkConfig>('resumeReview/getReviewingResumeReviews', (params, thunkApi) => {
    try {
        return getReviewingResumeReviews(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
