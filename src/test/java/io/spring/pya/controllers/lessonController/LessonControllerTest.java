package io.spring.pya.controllers.lessonController;

import io.spring.pya.controllers.LessonController;
import io.spring.pya.services.LessonService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ArgumentsSource;
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

    @ParameterizedTest
    @ArgumentsSource(LessonIdProvider.class)
    void getLessonById(long lessonId) {
        lessonController.getLessonById(lessonId);
        verify(lessonService, times(1)).getLessonById(lessonId);
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