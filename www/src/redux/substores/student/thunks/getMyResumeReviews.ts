import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken from '../../../../util/auth0/fetchWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { getResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedResumeReviewsWithDetails } from '../../../../util/serverResponses';
import { StudentDispatch, StudentState } from '../studentStore';

export type InitiateResumeReviewParams = {
    tokenAcquirer: TokenAcquirer;
};

type AsyncThunkConfig = {
    state: StudentState;
    dispatch: StudentDispatch;
    rejectValue: string;
};

export const getMyResumeReviews = async (params: InitiateResumeReviewParams): Promise<WrappedResumeReviewsWithDetails> => {
    const resumeReviewResult = await fetchWithToken<WrappedResumeReviewsWithDetails>(getResumeReviews, params.tokenAcquirer, [Scope.ReadMyResumeReviews]).catch(() => {
        throw new Error('Unable to fetch resume reviews');
    });
    return resumeReviewResult?.data ?? { resumeReviews: [] };
};

export default createAsyncThunk<WrappedResumeReviewsWithDetails, InitiateResumeReviewParams, AsyncThunkConfig>('resumeReview/getMyResumeReviews', async (params, thunkApi) => {
    try {
        return await getMyResumeReviews(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e.message);
    }
});
