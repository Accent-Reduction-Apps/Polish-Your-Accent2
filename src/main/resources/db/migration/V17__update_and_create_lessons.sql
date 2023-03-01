UPDATE lessons
SET	topic = 'Klasyfikacja spółgłosek',
    text = 'Lesson content to be updated'
WHERE lesson_id = 7;

UPDATE lessons
SET	topic = 'Spółgłoski angielskie: jak zapamiętać ich symbole?',
       text = 'Lesson content to be updated'
WHERE lesson_id = 8;

UPDATE lessons
SET	topic = 'Najważniejsze właściwości samogłosek',
       text = 'Lesson content to be updated'
WHERE lesson_id = 9;

UPDATE lessons
SET	topic = 'Samogłoski angielskie i ich zapis fonetyczny',
       text = 'Lesson content to be updated'
WHERE lesson_id = 10;

INSERT INTO lessons (topic, text)
VALUES ('Angielskie dyftongi', 'Lesson content to be updated');

