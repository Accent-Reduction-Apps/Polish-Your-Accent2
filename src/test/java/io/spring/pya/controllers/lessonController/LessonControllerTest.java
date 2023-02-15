package io.spring.pya.controllers.lessonController;

import io.spring.pya.controllers.LessonController;
import io.spring.pya.entities.Lesson;
import io.spring.pya.exceptions.ResourceNotFoundException;
import io.spring.pya.services.LessonService;
import io.spring.pya.util.UtilRandomNumber;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class LessonControllerTest {

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
    void getLessonById_lessonDoesntExist_lessonNotFoundException() {
        Long requestedLessonId = LessonProvider.getRandomId();
        when(lessonService.getLessonById(requestedLessonId)).thenReturn(null);

        assertThrows(ResourceNotFoundException.class, () -> lessonController.getLessonById(requestedLessonId));
        verify(lessonService, times(1)).getLessonById(requestedLessonId);

    }

    @Test
    void addLesson_completeLesson_status201() {
        Lesson lessonToAdd = LessonProvider.createRandomLesson();

        lessonController.addLesson(lessonToAdd);
        verify(lessonService, times(1)).addLesson(lessonToAdd);
    }

    @Test
    void updateLesson_updateNotExistingLesson_LessonNotFoundException() {
        Lesson lessonToUpdateWith = LessonProvider.createRandomLesson();
        Long lessonIdToUpdate = UtilRandomNumber.getRandomLong();
        when(lessonService.getLessonById(lessonIdToUpdate)).thenReturn(null);

        assertThrows(ResourceNotFoundException.class, () -> lessonController.updateLesson(lessonIdToUpdate, LessonProvider.createRandomLesson()));
        verify(lessonService, never()).updateLesson(LessonProvider.getRandomId(), lessonToUpdateWith);
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
    void deleteLesson_deleteNotExisting_LessonNotFoundException() {
        Long lessonIdToDelete = LessonProvider.getRandomId();
        when(lessonService.deleteLessonById(lessonIdToDelete)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> lessonController.deleteLesson(lessonIdToDelete));
        verify(lessonService, times(1)).deleteLessonById(lessonIdToDelete);
    }

    @Test
    void deleteLesson_deleteExisting_status204() {
        Long lessonIdToDelete = LessonProvider.getRandomId();
        when(lessonService.deleteLessonById(lessonIdToDelete)).thenReturn(true);

        ResponseEntity<Lesson> response = lessonController.deleteLesson(lessonIdToDelete);
        assertEquals(response.getStatusCode(), HttpStatusCode.valueOf(204));
        verify(lessonService, times(1)).deleteLessonById(lessonIdToDelete);
    }
}