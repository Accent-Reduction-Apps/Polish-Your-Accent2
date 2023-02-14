package io.spring.pya.controllers.lessonController;

import io.spring.pya.controllers.LessonController;
import io.spring.pya.entities.Lesson;
import io.spring.pya.exceptions.lesson.LessonNotFoundException;
import io.spring.pya.services.LessonService;
import io.spring.pya.util.UtilRandomNumber;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
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
    void getLessonById_correctLesson() {
        Long lessonId = LessonProvider.getRandomId();
        lessonController.getLessonById(lessonId);
        verify(lessonService, times(1)).getLessonById(lessonId);
    }

    @Test
    void addLesson_correctLesson() {
        Lesson dummyLesson = LessonProvider.createRandomLesson();
        lessonController.addLesson(dummyLesson);
        verify(lessonService, times(1)).addLesson(dummyLesson);
    }

    @Test
    void updateLesson_updateNotExistingLesson_LessonNotFoundException() {
        Lesson lessonToUpdateWith = LessonProvider.createRandomLesson();
        Long lessonIdToUpdate = UtilRandomNumber.getRandomLong();

        when(lessonService.getLessonById(lessonIdToUpdate)).thenReturn(null);

        verify(lessonService, never()).updateLesson(LessonProvider.getRandomId(), lessonToUpdateWith);
        assertThrows(LessonNotFoundException.class, () -> lessonController.updateLesson(lessonIdToUpdate, LessonProvider.createRandomLesson()));
    }

    @Test
    void updateLesson_updateExistingLesson_updatedLessonAndStatus200() {
        Lesson lessonToUpdateWith = LessonProvider.createRandomLesson();
        Lesson lessonToUpdate = LessonProvider.createRandomLesson();
        Lesson lessonUpdated = new Lesson(lessonToUpdate.getId(), lessonToUpdateWith.getLessonContent(), lessonToUpdateWith.getTopic());
        Long lessonIdToUpdate = lessonToUpdate.getId();

        when(lessonService.getLessonById(lessonIdToUpdate)).thenReturn(lessonToUpdate);
        when(lessonService.updateLesson(lessonIdToUpdate, lessonToUpdateWith)).thenReturn(lessonUpdated);
        ResponseEntity<Lesson> response = lessonController.updateLesson(lessonIdToUpdate, lessonToUpdateWith);

        verify(lessonService, times(1)).updateLesson(lessonToUpdate.getId(), lessonToUpdateWith);
        assertEquals(response.getBody(), lessonUpdated);
        assertEquals(response.getStatusCode(), HttpStatusCode.valueOf(200));
    }

    @Test
    void deleteLesson_deleteNotExisting_False() {
        Long lessonIdToDelete = LessonProvider.getRandomId();

        when(lessonService.deleteLessonById(lessonIdToDelete)).thenReturn(false);
        
        assertFalse(lessonController.deleteLesson(lessonIdToDelete));
        verify(lessonService, times(1)).deleteLessonById(lessonIdToDelete);
    }
}