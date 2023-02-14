package io.spring.pya.controllers.lessonController;

import io.spring.pya.controllers.LessonController;
import io.spring.pya.entities.Lesson;
import io.spring.pya.exceptions.lesson.LessonNotFoundException;
import io.spring.pya.services.LessonService;
import io.spring.pya.util.UtilRandomNumber;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertThrows;
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
        Long lessonId = LessonProvider.getRandomId();
        lessonController.getLessonById(lessonId);
        verify(lessonService, times(1)).getLessonById(lessonId);
    }

    @Test
    void addLesson() {
        Lesson dummyLesson = LessonProvider.createRandomLesson();
        lessonController.addLesson(dummyLesson);
        verify(lessonService, times(1)).addLesson(dummyLesson);
    }

    @Test
    void updateLesson_updateNotExistingLesson_LessonNotFoundException() {
        Lesson lessonToUpdateWith = LessonProvider.createRandomLesson();
        Long lessonIdToUpdate = UtilRandomNumber.getRandomLong();

        when(lessonService.getLessonById(lessonIdToUpdate)).thenReturn(null);

        verify(lessonService, never()).updateLesson(LessonProvider.createRandomLesson(), lessonToUpdateWith);
        assertThrows(LessonNotFoundException.class, () -> lessonController.updateLesson(lessonIdToUpdate, LessonProvider.createRandomLesson()));
    }

    @Test
    void deleteLesson() {
    }
}