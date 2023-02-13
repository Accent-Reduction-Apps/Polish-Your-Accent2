package io.spring.pya.controllers;

import io.spring.pya.services.LessonService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import static org.mockito.Mockito.*;

class LessonControllerTest {


    @Mock
    private LessonService lessonService;
    private LessonController lessonController;


    @BeforeEach
    void setUp() {
        lessonService = mock(LessonService.class);
        lessonController = new LessonController(lessonService);
    }

    @Test
    void getAllLessons_methodCalled_serviceGetAllLessonsInvoked() {
        lessonController.getAllLessons();
        verify(lessonService, times(1)).getAllLessons();
    }

    @Test
    void getLessonById() {
    }

    @Test
    void addLesson() {
    }

    @Test
    void addIngredientToPotion() {
    }

    @Test
    void deleteLesson() {
    }
}