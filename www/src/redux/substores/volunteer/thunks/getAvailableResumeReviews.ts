import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken from '../../../../util/auth0/fetchWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { getResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedResumeReviewsWithDetails } from '../../../../util/serverResponses';
import { VolunteerDispatch, VolunteerState } from '../volunteerStore';

export type GetAvailableResumeReviewParams = {
    tokenAcquirer: TokenAcquirer;
};

type AsyncThunkConfig = {
    state: VolunteerState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

export const getAvailableResumeReviews = async (params: GetAvailableResumeReviewParams): Promise<WrappedResumeReviewsWithDetails> => {
    const resumeReviewResult = await fetchWithToken<WrappedResumeReviewsWithDetails>(getResumeReviews, params.tokenAcquirer, [Scope.ReadAllResumeReviews], { state: 'seeking_reviewer' }).catch(() => {
        throw new Error('Unable to fetch available resume reviews');
    });
    return resumeReviewResult?.data ?? { resumeReviews: [] };
};

export default createAsyncThunk<WrappedResumeReviewsWithDetails, GetAvailableResumeReviewParams, AsyncThunkConfig>('resumeReview/getAvailableResumeReviews', (params, thunkApi) => {
    try {
        return getAvailableResumeReviews(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
