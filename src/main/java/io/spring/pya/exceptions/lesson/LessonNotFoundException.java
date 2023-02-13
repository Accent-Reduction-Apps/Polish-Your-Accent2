package io.spring.pya.exceptions.lesson;

public class LessonNotFoundException extends RuntimeException {
    public LessonNotFoundException(Long id) {
        super("No lesson found with id " + id);
    }
}
