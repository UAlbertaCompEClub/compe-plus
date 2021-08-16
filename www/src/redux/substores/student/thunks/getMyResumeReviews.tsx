import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken from '../../../../util/auth0/fetchWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { getResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedResumeReviews } from '../../../../util/serverResponses';
import { StudentDispatch, StudentState } from '../studentStore';

export type InitiateResumeReviewParams = {
    tokenAcquirer: TokenAcquirer;
};

type AsyncThunkConfig = {
    state: StudentState;
    dispatch: StudentDispatch;
    rejectValue: string;
};

export const getMyResumeReviews = async (params: InitiateResumeReviewParams): Promise<WrappedResumeReviews> => {
    const resumeReviewResult = await fetchWithToken<WrappedResumeReviews>(getResumeReviews, params.tokenAcquirer, [Scope.ReadMyResumeReviews]).catch(() => {
        throw new Error('Unable to fetch resume reviews');
    });
    return resumeReviewResult?.data ?? { resumeReviews: [] };
};

export default createAsyncThunk<WrappedResumeReviews, InitiateResumeReviewParams, AsyncThunkConfig>('resumeReview/initiate', (params, thunkApi) => {
    try {
        return getMyResumeReviews(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
