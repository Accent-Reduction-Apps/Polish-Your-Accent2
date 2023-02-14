CREATE SEQUENCE IF NOT EXISTS hibernate_sequence;

CREATE SEQUENCE IF NOT EXISTS lessons_seq;

CREATE SEQUENCE IF NOT EXISTS users_seq;

CREATE TABLE lessons
(
    lesson_id BIGINT NOT NULL,
    text      VARCHAR(255),
    topic     VARCHAR(255),
    CONSTRAINT lessons_pkey PRIMARY KEY (lesson_id)
);

CREATE TABLE users
(
    user_id       BIGINT NOT NULL,
    email_address VARCHAR(255),
    name          VARCHAR(255),
    password      VARCHAR(255),
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

CREATE TABLE users_user_lessons
(
    user_student_user_id   BIGINT NOT NULL,
    user_lessons_lesson_id BIGINT NOT NULL,
    CONSTRAINT users_user_lessons_pkey PRIMARY KEY (user_student_user_id, user_lessons_lesson_id)
);

ALTER TABLE users_user_lessons ADD CONSTRAINT fkbiukn51sakfln5exhy4glwvx5 FOREIGN KEY (user_lessons_lesson_id) REFERENCES lessons (lesson_id) ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE users_user_lessons ADD CONSTRAINT fkmhnfqovj1pt6bepqskq4vlcdx FOREIGN KEY (user_student_user_id) REFERENCES users (user_id) ON UPDATE NO ACTION ON DELETE NO ACTION;