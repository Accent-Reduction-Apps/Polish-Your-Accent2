package io.spring.pya.services;

import io.spring.pya.repositories.LessonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.mock;

class LessonServiceTest {

    private LessonRepository lessonRepository;
    private LessonService lessonService;

    @BeforeEach
    void setUp() {
        lessonRepository = mock(LessonRepository.class);
        lessonService = new LessonService(lessonRepository);
    }

    @Test
    void getAllLessons_loadLessonsFromDB_ListOfLessons() {
    }

    @Test
    void getLessonById_LessonExists_Lesson() {
    }

    @Test
    void getLessonById_LessonDoesntExists_null() {

    }

    @Test
    void addLesson_completeLesson_lessonSaved() {
    }

    @Test
    void updateLesson_lessonToUpdateExists_updatedLesson() {
    }

    @Test
    void updateLesson_lessonToUpdateDoesntExists_null() {
    }

    @Test
    void deleteLessonById_lessonToBeDeletedExists_true() {
    }

    @Test
    void deleteLessonById_lessonToBeDeletedDoesntExists_false() {
    }
}