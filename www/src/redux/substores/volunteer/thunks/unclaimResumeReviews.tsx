import { createAsyncThunk } from '@reduxjs/toolkit';

import patchWithToken from '../../../../util/auth0/patchWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { patchResumeReviews } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedResumeReviews } from '../../../../util/serverResponses';
import { VolunteerDispatch, VolunteerState } from '../volunteerStore';

export type UnclaimResumeReviewParams = {
    tokenAcquirer: TokenAcquirer;
    resumeReviewId: string;
};

type AsyncThunkConfig = {
    state: VolunteerState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

export const unclaimResumeReview = async (params: UnclaimResumeReviewParams): Promise<void> => {
    await patchWithToken<WrappedResumeReviews>(patchResumeReviews(params.resumeReviewId), params.tokenAcquirer, { state: 'seeking_reviewer', reviewer: null }, [Scope.UpdateAllResumeReviews]).catch(
        () => {
            throw new Error('Unable to fetch reviewing resume reviews');
        },
    );
};

export default createAsyncThunk<void, UnclaimResumeReviewParams, AsyncThunkConfig>('resumeReview/unclaimResumeReview', (params, thunkApi) => {
    try {
        return unclaimResumeReview(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
