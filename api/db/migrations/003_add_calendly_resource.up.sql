/* calendlys table */
CREATE TABLE IF NOT EXISTS calendlys (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    link TEXT NOT NULL,
    interviewee TEXT REFERENCES users ON DELETE RESTRICT,
    interviewer TEXT NOT NULL REFERENCES users ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_time_calendlys
    BEFORE UPDATE
    ON calendlys
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
