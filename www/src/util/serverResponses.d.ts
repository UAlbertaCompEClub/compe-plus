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

export type ResumeReviewWithName = {
    id: string;
    revieweeId: string;
    reviewerId: string | null;
    state: 'canceled' | 'finished' | 'reviewing' | 'seeking_reviewer';
    createdAt: string;
    updatedAt: string;
    revieweeName: string;
};

export type WrappedResumeReview = {
    resumeReview: ResumeReview;
};

export type WrappedResumeReviews = {
    resumeReviews: ResumeReview[];
};

export type WrappedResumeReviewWithNames = {
    resumeReviews: ResumeReviewWithName[];
};

export type Document = {
    id: string;
    note: string;
    isReview: boolean;
    userId: string;
    resumeReviewId: string;
    createdAt: string;
    updatedAt: string;
    base64Contents: string;
};

export type WrappedDocument = {
    document: Document;
};

export type Role = {
    userId: string;
    role: string;
    createdAt: string;
};

export type WrappedDocuments = {
    documents: Document[];
};

export type Calendly = {
    id: string;
    link: string;
    interviewees?: string[];
    interviewer: string;
    createdAt: string;
    updatedAt: string;
};

export type WrappedCalendly = {
    calendly: Calendly;
};

export type WrappedCalendlys = {
    calendlys: Calendly[];
};
