import { createAsyncThunk } from '@reduxjs/toolkit';

import patchWithToken from '../../../../util/auth0/patchWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { patchResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedResumeReviews } from '../../../../util/serverResponses';
import { VolunteerDispatch, VolunteerState } from '../volunteerStore';

export type ClaimResumeReviewParams = {
    tokenAcquirer: TokenAcquirer;
    userId: string;
    resumeReviewId: string;
};

type AsyncThunkConfig = {
    state: VolunteerState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

export const claimResumeReview = async (params: ClaimResumeReviewParams): Promise<void> => {
    await patchWithToken<WrappedResumeReviews>(patchResumeReviews(params.resumeReviewId), params.tokenAcquirer, { state: 'reviewing', reviewer: params.userId }, [Scope.UpdateAllResumeReviews]).catch(
        () => {
            throw new Error('Unable to fetch reviewing resume reviews');
        },
    );
};

export default createAsyncThunk<void, ClaimResumeReviewParams, AsyncThunkConfig>('resumeReview/claimResumeReview', (params, thunkApi) => {
    try {
        return claimResumeReview(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
