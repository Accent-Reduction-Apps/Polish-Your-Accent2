CREATE SEQUENCE IF NOT EXISTS lessons_lesson_id_seq;

CREATE TABLE lessons
(
    lesson_id BIGINT NOT NULL DEFAULT nextval('lessons_lesson_id_seq'),
    text      VARCHAR(255),
    topic     VARCHAR(255),
    CONSTRAINT lessons_pkey PRIMARY KEY (lesson_id)
);

ALTER SEQUENCE lessons_lesson_id_seq OWNED BY lessons.lesson_id;
