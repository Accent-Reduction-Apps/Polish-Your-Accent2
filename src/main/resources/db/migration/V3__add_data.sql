INSERT INTO lessons (text, topic)
VALUES ('text to lesson 11', 'Lesson 11');

INSERT INTO users (email_address, name, password, email_name)
VALUES ('Basia@gmail.com', 'Basia Kowal', 'BasiaHaslo', 'email_name');


 INSERT INTO task (lesson_lesson_id, name, start_date, end_date, assignee_user_id)
VALUES (1, 'Task   ', NOW(), NOW(), 1);