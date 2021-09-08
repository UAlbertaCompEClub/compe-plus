import { createAsyncThunk } from '@reduxjs/toolkit';

import postWithToken from '../../../../util/auth0/postWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { postCalendly } from '../../../../util/endpoints';
import { WrappedCalendly } from '../../../../util/serverResponses';
import { VolunteerDispatch, VolunteerState } from '../volunteerStore';

export type SetCalendlyLinkParams = {
    tokenAcquirer: TokenAcquirer;
    interviewerId: string;
    link: string;
};

type AsyncThunkConfig = {
    state: VolunteerState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

export const setCalendlyLink = async (params: SetCalendlyLinkParams): Promise<WrappedCalendly | undefined> => {
    // TODO pass through scopes for auth
    const calendlyResult = await postWithToken<{ interviewer: string; link: string }, WrappedCalendly>(postCalendly, params.tokenAcquirer, [], {
        interviewer: params.interviewerId,
        link: params.link,
    });
    return calendlyResult?.data;
};

export default createAsyncThunk<WrappedCalendly | undefined, SetCalendlyLinkParams, AsyncThunkConfig>('mockInterview/setCalendlyLink', (params, thunkApi) => {
    try {
        return setCalendlyLink(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
