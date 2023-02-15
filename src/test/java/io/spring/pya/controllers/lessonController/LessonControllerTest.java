package io.spring.pya.controllers.lessonController;

import io.spring.pya.controllers.LessonController;
import io.spring.pya.entities.Lesson;
import io.spring.pya.exceptions.lesson.LessonNotFoundException;
import io.spring.pya.services.LessonService;
import io.spring.pya.util.UtilRandomNumber;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.List;

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
    void getAllLessons_methodCalled_LessonsListAndStatus200() {
        List<Lesson> allLessons = LessonProvider.createRandomLessonsList(UtilRandomNumber.getRandomInt(5, 50));

        when(lessonService.getAllLessons()).thenReturn(allLessons);

        ResponseEntity<List<Lesson>> allLessonsReceived = lessonController.getAllLessons();

        verify(lessonService, times(1)).getAllLessons();
        assertEquals(allLessonsReceived.getBody(), allLessons);
        assertEquals(allLessonsReceived.getStatusCode(), HttpStatusCode.valueOf(200));
    }

    @Test
    void getLessonById_lessonExists_200() {
        Lesson lessonShouldBeReceived = LessonProvider.createRandomLesson();

        when(lessonService.getLessonById(lessonShouldBeReceived.getId())).thenReturn(lessonShouldBeReceived);

        ResponseEntity<Lesson> getLessonByIdResponse = lessonController.getLessonById(lessonShouldBeReceived.getId());
        verify(lessonService, times(1)).getLessonById(lessonShouldBeReceived.getId());
        assertEquals(getLessonByIdResponse.getBody(), lessonShouldBeReceived);
        assertEquals(getLessonByIdResponse.getStatusCode(), HttpStatusCode.valueOf(200));
    }

    @Test
    void getLessonById_lessonDoesntExist_404() {
        Long requestedLessonId = LessonProvider.getRandomId();

        when(lessonService.getLessonById(requestedLessonId)).thenReturn(null);

        assertThrows(LessonNotFoundException.class, () -> {
            ResponseEntity<Lesson> response = lessonController.getLessonById(requestedLessonId);
            assertEquals(response.getStatusCode(), HttpStatus.NOT_FOUND);
        });
        verify(lessonService, times(1)).getLessonById(requestedLessonId);

    }

    @Test
    void addLesson_completeLesson_status201() {
        Lesson lessonToAdd = LessonProvider.createRandomLesson();

        lessonController.addLesson(lessonToAdd);

        verify(lessonService, times(1)).addLesson(lessonToAdd);
    }

    @Test
    void updateLesson_updateNotExistingLesson_LessonNotFoundExceptionAndStatus404() {
        Lesson lessonToUpdateWith = LessonProvider.createRandomLesson();
        Long lessonIdToUpdate = UtilRandomNumber.getRandomLong();

        when(lessonService.getLessonById(lessonIdToUpdate)).thenReturn(null);

        verify(lessonService, never()).updateLesson(LessonProvider.getRandomId(), lessonToUpdateWith);
        assertThrows(LessonNotFoundException.class, () -> {
            ResponseEntity<Lesson> response = lessonController.updateLesson(lessonIdToUpdate, LessonProvider.createRandomLesson());
            assertEquals(response.getStatusCode(), HttpStatus.NOT_FOUND);
        });
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
    void deleteLesson_deleteNotExisting_LessonNotFoundExceptionAndStatus404() {
        Long lessonIdToDelete = LessonProvider.getRandomId();

        when(lessonService.deleteLessonById(lessonIdToDelete)).thenReturn(false);

        assertFalse(lessonController.deleteLesson(lessonIdToDelete));
        verify(lessonService, times(1)).deleteLessonById(lessonIdToDelete);
    }

    @Test
    void deleteLesson_deleteExisting_status204() {
        Long lessonIdToDelete = LessonProvider.getRandomId();

        when(lessonService.deleteLessonById(lessonIdToDelete)).thenReturn(true);

        assertTrue(lessonController.deleteLesson(lessonIdToDelete));
        verify(lessonService, times(1)).deleteLessonById(lessonIdToDelete);
    }
}