export type User = {
    id: string;
    email: string;
    ccid: string;
    program: string;
    year: number;
    givenName: string;
    familyName: string;
    fullName: string;
    photoUrl?: string;
    createdAt: string;
    updatedAt: string;
};

export type WrappedUser = {
    user: User;
};

export type ResumeReview = {
    id: string;
    revieweeId: string;
    reviewerId: string | null;
    state: 'canceled' | 'finished' | 'reviewing' | 'seeking_reviewer';
    createdAt: string;
    updatedAt: string;
};

export type Document = {
    id: string;
    note: string;
    isReview: boolean;
    userId: string;
    resumeReviewId: string;
    createdAt: string;
    updatedAt: string;
};
