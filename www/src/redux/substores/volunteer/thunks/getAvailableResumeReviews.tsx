import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken from '../../../../util/auth0/fetchWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { getResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedResumeReviews } from '../../../../util/serverResponses';
import { VolunteerDispatch, VolunteerState } from '../volunteerStore';

export type InitiateResumeReviewParams = {
    tokenAcquirer: TokenAcquirer;
};

type AsyncThunkConfig = {
    state: VolunteerState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

export const getAvailableResumeReviews = async (params: InitiateResumeReviewParams): Promise<WrappedResumeReviews> => {
    const resumeReviewResult = await fetchWithToken<WrappedResumeReviews>(getResumeReviews, params.tokenAcquirer, [Scope.ReadMyResumeReviews], { state: 'seeking_reviewer' }).catch(() => {
        throw new Error('Unable to fetch available resume reviews');
    });
    console.log('hi');
    return resumeReviewResult?.data ?? { resumeReviews: [] };
};

export default createAsyncThunk<WrappedResumeReviews, InitiateResumeReviewParams, AsyncThunkConfig>('resumeReview/getAvailableResumeReviews', (params, thunkApi) => {
    try {
        return getAvailableResumeReviews(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
