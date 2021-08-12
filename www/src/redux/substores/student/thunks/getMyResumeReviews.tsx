import { createAsyncThunk } from '@reduxjs/toolkit';

import postWithToken from '../../../../util/auth0/postWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { postResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedResumeReviews } from '../../../../util/serverResponses';
import { StudentDispatch, StudentState } from '../studentStore';

export type InitiateResumeReviewParams = {
    userId: string;
    base64Contents: string;
    tokenAcquirer: TokenAcquirer;
};

type AsyncThunkConfig = {
    state: StudentState;
    dispatch: StudentDispatch;
    rejectValue: string;
};

export const getMyResumeReviews = async (params: InitiateResumeReviewParams): Promise<WrappedResumeReviews> => {
    const resumeReviewResult = await postWithToken<unknown, WrappedResumeReviews>(postResumeReviews, params.tokenAcquirer, [Scope.ReadMyResumeReviews], {
        reviewee: params.userId,
    }).catch(() => {
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
