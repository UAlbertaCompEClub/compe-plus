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
    created_at: db.TimestampTzString;
    updated_at: db.TimestampTzString;
};

// TODO: Find better way of syncing server reponse types
