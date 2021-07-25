interface User {
    /** Issuer of the JWT. */
    iss?: string;
    /** Subject of the JWT. */
    sub: string;
    /** Recipient for wh ich the JWT is intended. */
    aud?: string;
    /** Time at which the JWT was issued; can be used to determine age of the JWT. */
    iat?: number;
    /** Time after which the JWT expires. */
    exp?: number;
    /** Authorized party. Client id of who is authorized. */
    azp?: string;
    /** Scope of permissions. */
    scope?: string;
    /** Grant type. */
    gty?: string;
    /** Permissions. */
    permissions?: string[];
}

declare namespace Express {
    export interface Request {
        user: User;
    }
}
