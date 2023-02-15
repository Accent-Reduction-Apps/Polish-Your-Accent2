package io.spring.pya.controllers.lessonController;

import io.spring.pya.entities.Lesson;
import io.spring.pya.util.UtilRandomNumber;

import java.util.ArrayList;
import java.util.List;

public class LessonProvider {
    public static Lesson createRandomLesson() {
        return new Lesson(
                UtilRandomNumber.getRandomLong(),
                "Random lesson content" + UtilRandomNumber.getRandomLong(),
                "Random topic" + UtilRandomNumber.getRandomLong()
        );
    }

    public static List<Lesson> createRandomLessonsList(int size) {
        List<Lesson> lessons = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            lessons.add(createRandomLesson());
        }
        return lessons;
    }

    public static Long getRandomId() {
        return UtilRandomNumber.getRandomLong();
    }
}
