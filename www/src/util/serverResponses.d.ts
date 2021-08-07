export declare type DateString = `${number}-${number}-${number}`;
export declare type TimeString = `${number}:${number}${'' | `:${number}`}`;
export declare type TzSuffix = 'Z' | `${'+' | '-'}${number}${'' | `:${number}`}`;
export declare type TimeTzString = `${TimeString}${TzSuffix}`;
export declare type TimestampString = `${DateString}T${TimeString}`;
export type TimestampTzString = `${TimestampString}${TzSuffix}`; // ISO8601-formatted date and time string **with no timezone**

export type User = {
    id: string;
    email: string;
    ccid: string;
    program: string;
    year: number;
    given_name: string;
    family_name: string;
    full_name: string;
    photo_url: string | null;
    created_at: TimestampTzString;
    updated_at: TimestampTzString;
};

export type WrappedUser = {
    user: User;
};
