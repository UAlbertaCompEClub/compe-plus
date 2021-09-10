import { createAsyncThunk } from '@reduxjs/toolkit';

import fetchWithToken from '../../../../util/auth0/fetchWithToken';
import TokenAcquirer from '../../../../util/auth0/TokenAcquirer';
import { getCalendlys } from '../../../../util/endpoints';
import Scope from '../../../../util/scopes';
import { WrappedCalendlys } from '../../../../util/serverResponses';
import { VolunteerDispatch, VolunteerState } from '../volunteerStore';

export type GetCalendlyLinkParams = {
    tokenAcquirer: TokenAcquirer;
    interviewerId: string;
};

type AsyncThunkConfig = {
    state: VolunteerState;
    dispatch: VolunteerDispatch;
    rejectValue: string;
};

export const getCalendlyLink = async (params: GetCalendlyLinkParams): Promise<WrappedCalendlys> => {
    const calendlysResult = await fetchWithToken<WrappedCalendlys>(getCalendlys, params.tokenAcquirer, [Scope.ReadCalendlys], { interviewer: params.interviewerId }).catch(() => {
        throw new Error('Unable to fetch calendly link');
    });
    return calendlysResult?.data ?? { calendlys: [] };
};

export default createAsyncThunk<WrappedCalendlys, GetCalendlyLinkParams, AsyncThunkConfig>('mockInterview/getCalendlyLink', (params, thunkApi) => {
    try {
        return getCalendlyLink(params);
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
});
