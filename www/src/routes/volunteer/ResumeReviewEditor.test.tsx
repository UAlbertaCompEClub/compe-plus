import { Auth0ContextInterface, useAuth0, User } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import PDFViewer from '../../components/pdf/PDFViewer';
import { useVolunteerDispatch, useVolunteerSelector } from '../../redux/substores/volunteer/volunteerHooks';
import { VolunteerState } from '../../redux/substores/volunteer/volunteerStore';
import { RESUME_REVIEW_ROUTE } from '../../util/constants';
import { WrappedDocuments } from '../../util/serverResponses';
import mockConstants from '../../util/testConstants';
import ResumeReviewEditor from './ResumeReviewEditor';
import getMyDocuments, { AsyncThunkConfig, GetMyDocumentsParams } from './thunks/getMyDocuments';
import patchResumeReview, { PatchResumeReviewParams } from './thunks/patchResumeReview';

jest.mock('@auth0/auth0-react');
const mockUseAuth0 = mocked(useAuth0, true);

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        useParams: () => ({
            resumeReviewId: mockConstants.document1.resumeReviewId,
        }),
        useHistory: () => ({
            push: mockHistoryPush,
        }),
    };
});

jest.mock('../../redux/substores/volunteer/volunteerHooks');
const mockUseVolunteerSelector = mocked(useVolunteerSelector, true);
const mockUseVolunteerDispatch = mocked(useVolunteerDispatch, true);

jest.mock('./thunks/getMyDocuments');
const mockGetMyDocuments = mocked(getMyDocuments, true);

jest.mock('./thunks/patchResumeReview');
const mockPatchResumeReview = mocked(patchResumeReview, true);

describe('ReviewResume', () => {
    let mockVolunteerState: VolunteerState;
    const mockDispatch = jest.fn();
    const mockGetAccessTokenSilently = jest.fn();
    const mockAuth0State = {
        getAccessTokenSilently: mockGetAccessTokenSilently,
    } as unknown as Auth0ContextInterface<User>;

    beforeEach(() => {
        mockVolunteerState = mockConstants.volunteerState;

        mockUseVolunteerSelector.mockImplementation((selector) => selector(mockVolunteerState));
        mockUseVolunteerDispatch.mockReturnValue(mockDispatch);

        mockUseAuth0.mockReturnValue(mockAuth0State);
    });

    it('fetches documents for currently reviewing', () => {
        mockUseVolunteerSelector.mockImplementation((selector) => selector(mockVolunteerState));

        const mockAction = {};
        mockGetMyDocuments.mockReturnValueOnce(mockAction as AsyncThunkAction<WrappedDocuments, GetMyDocumentsParams, AsyncThunkConfig>);

        mount(<ResumeReviewEditor />);

        expect(mockDispatch).toBeCalledWith(mockAction);
    });

    it('Does not display PDFViewer while document is being loaded', () => {
        const result = shallow(<ResumeReviewEditor />);

        expect(result.find(PDFViewer)).toHaveLength(0);
    });

    it('displays PDFViewer when document has been loaded', () => {
        mockVolunteerState.resumeReviewEditor.currentDocument = mockConstants.document1;

        mockUseVolunteerSelector.mockImplementation((selector) => selector(mockVolunteerState));

        const result = shallow(<ResumeReviewEditor />);

        expect(result.find(PDFViewer)).toHaveLength(1);
    });

    it('redirects user to resume reviews page on complete', () => {
        mockVolunteerState.resumeReviewEditor.isDone = true;

        mockUseVolunteerSelector.mockImplementation((selector) => selector(mockVolunteerState));

        mount(<ResumeReviewEditor />);

        expect(mockHistoryPush).toBeCalledWith(RESUME_REVIEW_ROUTE);
    });

    it('patches resume review when complete review is clicked', () => {
        const mockAction = {};
        mockPatchResumeReview.mockReturnValueOnce(mockAction as AsyncThunkAction<void, PatchResumeReviewParams, AsyncThunkConfig>);

        const result = shallow(<ResumeReviewEditor />);

        const completeReviewButtonOnClickHandler = result.find(Button).prop('onClick');
        if (completeReviewButtonOnClickHandler === undefined) {
            fail('no onClick handler for completeReviewButton');
        }

        completeReviewButtonOnClickHandler({} as never);

        expect(mockDispatch).toBeCalledWith(mockAction);
    });
});
