export const decodeQueryToUser = (user?: string): string | undefined => {
    return user ? decodeURIComponent(user) : undefined;
};

export const documentS3Key = (resumeReview: string, document: string): string => {
    return `resume-reviews/${resumeReview}/documents/${document}`;
};
