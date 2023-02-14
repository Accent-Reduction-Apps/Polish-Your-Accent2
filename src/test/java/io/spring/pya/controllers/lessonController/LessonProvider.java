package io.spring.pya.controllers.lessonController;

import io.spring.pya.entities.Lesson;
import io.spring.pya.util.UtilRandomNumber;

public class LessonProvider {
    public static Lesson createRandomLesson() {
//        return new Lesson(
        return new Lesson(
                UtilRandomNumber.getRandomLong(),
                "Random lesson content" + UtilRandomNumber.getRandomLong(),
                "Random topic" + UtilRandomNumber.getRandomLong()
        );
    }

    public static Long getRandomId() {
        return UtilRandomNumber.getRandomLong();
    }
}
