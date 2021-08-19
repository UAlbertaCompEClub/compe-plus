import { RootState } from '../redux/store';
import { StudentState } from '../redux/substores/student/studentStore';
import { Document, ResumeReview, User } from './serverResponses';

const user1: User = {
    id: 'google-oauth2|999937999992352499990',
    email: 'email@domain.com',
    ccid: 'myccid',
    program: 'compe',
    year: 4,
    givenName: 'bob',
    familyName: 'saggit',
    fullName: 'bob saggit',
    photoUrl: 'asdf.com',
    createdAt: '2021-06-14T06:09:19.373404+00:00',
    updatedAt: '2021-06-14T06:09:19.373404+00:00',
};

const resumeReview1: ResumeReview = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    revieweeId: user1.id,
    reviewerId: null,
    state: 'seeking_reviewer',
    createdAt: '2021-06-14T06:09:19.373404+00:00',
    updatedAt: '2021-06-14T06:09:19.373404+00:00',
};

const document1: Document = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    note: '',
    isReview: false,
    userId: user1.id,
    resumeReviewId: '123e4567-e89b-12d3-a456-426614174000',
    createdAt: '2021-06-14T06:09:19.373404+00:00',
    updatedAt: '2021-06-14T06:09:19.373404+00:00',
};

const globalState: RootState = {
    user: {
        roles: [],
        currentRole: '',
        isLoading: false,
        hasRegistered: true,
        isEditRolesDialogOpen: false,
    },
    registerUser: {
        year: 0,
        program: '',
        registrationSuccess: null,
        isLoading: false,
    },
};

const studentState: StudentState = {
    resumeReview: {
        resumeReviews: [],
        isLoading: false,
    },
};

export default { user1, resumeReview1, document1, globalState, studentState };
