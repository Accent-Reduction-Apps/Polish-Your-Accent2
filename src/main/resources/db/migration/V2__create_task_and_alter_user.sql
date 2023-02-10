DROP SEQUENCE lessons_seq CASCADE;

DROP SEQUENCE users_seq CASCADE;

CREATE SEQUENCE IF NOT EXISTS lessons_lesson_id_seq;
ALTER TABLE lessons
    ALTER COLUMN lesson_id SET NOT NULL;
ALTER TABLE lessons
    ALTER COLUMN lesson_id SET DEFAULT nextval('lessons_lesson_id_seq');

ALTER SEQUENCE lessons_lesson_id_seq OWNED BY lessons.lesson_id;

CREATE SEQUENCE IF NOT EXISTS users_user_id_seq;
ALTER TABLE users
    ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE users
    ALTER COLUMN user_id SET DEFAULT nextval('users_user_id_seq');

ALTER SEQUENCE users_user_id_seq OWNED BY users.user_id;