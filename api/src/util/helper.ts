export const decodeQueryToUser = (user?: string): string | undefined => {
    return user ? decodeURIComponent(user) : undefined;
};
