function emailDomainWhitelist(user, context, callback) {
    // Access should only be granted to verified users.
    if (!user.email || !user.email_verified) {
        return callback(new UnauthorizedError('Access denied.'));
    }

    const whitelist = ['ualberta.ca']; //authorized domains
    const userHasAccess = whitelist.some(function (domain) {
        const emailSplit = user.email.split('@');
        return emailSplit[emailSplit.length - 1].toLowerCase() === domain;
    });

    if (!userHasAccess) {
        return callback(new UnauthorizedError('You can only use CompE+ with your ualberta.ca account. You might need to clear your cookies to choose another account.'));
    }

    return callback(null, user, context);
}
