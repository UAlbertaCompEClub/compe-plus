import { Auth0ContextInterface, useAuth0, User } from '@auth0/auth0-react';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import LoadingOverlay from '../../components/LoadingOverlay';
import PDFViewer from '../../components/pdf/PDFViewer';
import { useVolunteerDispatch, useVolunteerSelector } from '../../redux/substores/volunteer/volunteerHooks';
import { VolunteerState } from '../../redux/substores/volunteer/volunteerStore';
import { RESUME_REVIEW_ROUTE } from '../../util/constants';
import { WrappedDocuments } from '../../util/serverResponses';
import mockConstants from '../../util/testConstants';
import ResumeReviewEditor from './ResumeReviewEditor';
import getMyDocuments, { AsyncThunkConfig, GetMyDocumentsParams } from './thunks/getMyDocuments';

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
        mockVolunteerState.resumeReviewEditor.isResumeReviewPatched = true;
        mockVolunteerState.resumeReviewEditor.isDocumentPatched = true;

        mockUseVolunteerSelector.mockImplementation((selector) => selector(mockVolunteerState));

        mount(<ResumeReviewEditor />);

        expect(mockHistoryPush).toBeCalledWith(RESUME_REVIEW_ROUTE);
    });

    it('does not redirect when still saving even when the resume review has been patched', () => {
        mockVolunteerState.resumeReviewEditor.isResumeReviewPatched = true;
        mockVolunteerState.resumeReviewEditor.isDocumentPatched = false;

        mockUseVolunteerSelector.mockImplementation((selector) => selector(mockVolunteerState));

        mount(<ResumeReviewEditor />);

        expect(mockHistoryPush).not.toBeCalledWith(RESUME_REVIEW_ROUTE);
    });

    it('displays loading overlay when resume review has been patched but is still uploading reviewed document', () => {
        mockVolunteerState.resumeReviewEditor.isResumeReviewPatched = true;
        mockVolunteerState.resumeReviewEditor.isDocumentPatched = false;

        mockUseVolunteerSelector.mockImplementation((selector) => selector(mockVolunteerState));

        const result = shallow(<ResumeReviewEditor />);

        expect(result.find(LoadingOverlay).props()['open']).toBe(true);
    });
});
