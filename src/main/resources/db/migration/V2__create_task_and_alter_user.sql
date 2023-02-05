CREATE TABLE task
(
    id               BIGSERIAL NOT NULL,
    lesson_lesson_id BIGINT,
    name             VARCHAR(255),
    start_date       TIMESTAMP WITHOUT TIME ZONE,
    end_date         TIMESTAMP WITHOUT TIME ZONE,
    assignee_user_id BIGINT,
    CONSTRAINT pk_task PRIMARY KEY (id)
);

ALTER TABLE users
    ADD email_name VARCHAR(255);

ALTER TABLE users
    ADD CONSTRAINT uc_users_email_name UNIQUE (email_name);

ALTER TABLE task
    ADD CONSTRAINT FK_TASK_ON_ASSIGNEE_USER FOREIGN KEY (assignee_user_id) REFERENCES users (user_id);

ALTER TABLE task
    ADD CONSTRAINT FK_TASK_ON_LESSON_LESSON FOREIGN KEY (lesson_lesson_id) REFERENCES lessons (lesson_id);

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