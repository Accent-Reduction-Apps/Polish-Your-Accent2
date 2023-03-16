CREATE TABLE users_user_lessons
(
    user_student_user_id   BIGINT NOT NULL,
    user_lessons_lesson_id BIGINT NOT NULL,
    CONSTRAINT users_user_lessons_pkey PRIMARY KEY (user_student_user_id, user_lessons_lesson_id),
    FOREIGN KEY (user_lessons_lesson_id) REFERENCES lessons (lesson_id) ON UPDATE NO ACTION ON DELETE NO ACTION,
    FOREIGN KEY (user_student_user_id) REFERENCES users (user_id) ON UPDATE NO ACTION ON DELETE NO ACTION
);