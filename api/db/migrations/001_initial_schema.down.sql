DROP TRIGGER IF EXISTS update_time_interviews ON interviews;

DROP TABLE IF EXISTS interviews;

DROP TRIGGER IF EXISTS update_time_time_slots ON time_slots;

DROP TABLE IF EXISTS time_slots;

DROP TRIGGER IF EXISTS update_time_documents ON documents;

DROP TABLE IF EXISTS documents;

DROP TRIGGER IF EXISTS update_time_resume_reviews ON resume_reviews;

DROP TABLE IF EXISTS resume_reviews;

DROP TABLE IF EXISTS resume_review_states;

DROP TABLE IF EXISTS user_roles;

DROP TABLE IF EXISTS roles;

DROP TRIGGER IF EXISTS update_time_users ON users;

DROP TABLE IF EXISTS users;

DROP FUNCTION IF EXISTS update_modified_column();

DROP EXTENSION IF EXISTS "uuid-ossp";
