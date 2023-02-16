package com.pya.services;

import com.pya.entities.Lesson;
import com.pya.providers.LessonProvider;
import com.pya.repositories.LessonRepository;
import com.pya.util.UtilRandomNumber;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
        List<Lesson> allLessons = LessonProvider.createRandomLessonsList(UtilRandomNumber.getRandomInt(5, 50));
        when(lessonRepository.findAll()).thenReturn(allLessons);

        List<Lesson> allLessonsReceived = lessonService.getAllLessons();

        verify(lessonRepository, times(1)).findAll();
        assertEquals(allLessonsReceived, allLessons);
    }

    @Test
    void getLessonById_LessonExists_Lesson() {
        Lesson lessonShouldBeReceived = LessonProvider.createRandomLesson();
        when(lessonRepository.findById(lessonShouldBeReceived.getId())).thenReturn(Optional.of(lessonShouldBeReceived));

        Lesson response = lessonService.getLessonById(lessonShouldBeReceived.getId());

        verify(lessonRepository, times(1)).findById(lessonShouldBeReceived.getId());
        assertEquals(lessonShouldBeReceived, response);
    }

    @Test
    void getLessonById_LessonDoesntExists_null() {
        Long searchedLessonId = LessonProvider.getRandomId();
        when(lessonRepository.findById(searchedLessonId)).thenReturn(Optional.empty());

        Lesson response = lessonService.getLessonById(searchedLessonId);

        verify(lessonRepository, times(1)).findById(searchedLessonId);
        assertNull(response);
    }

    @Test
    void addLesson_completeLesson_lessonSaved() {
        Lesson lessonToAdd = LessonProvider.createRandomLesson();

        lessonService.addLesson(lessonToAdd);
        verify(lessonRepository, times(1)).saveAndFlush(lessonToAdd);
    }

    @Test
    void updateLesson_lessonToUpdateExists_updatedLesson() {
        Lesson lessonToUpdateWith = LessonProvider.createRandomLesson();
        Lesson lessonToUpdate = LessonProvider.createRandomLesson();
        Long lessonIdToUpdate = lessonToUpdate.getId();
        Lesson lessonUpdated = new Lesson(lessonToUpdate.getId(), lessonToUpdateWith.getLessonContent(), lessonToUpdateWith.getTopic());
        when(lessonRepository.getReferenceById(lessonIdToUpdate)).thenReturn(lessonUpdated);

        Lesson response = lessonService.updateLesson(lessonIdToUpdate, lessonToUpdateWith);
        verify(lessonRepository, times(1)).deleteById(lessonIdToUpdate);
        verify(lessonRepository, times(1)).save(lessonToUpdateWith);
        verify(lessonRepository, times(1)).getReferenceById(lessonIdToUpdate);
        assertEquals(lessonUpdated, response);
    }

    @Test
    void deleteLessonById_lessonToBeDeletedExists_true() {
        Lesson lessonToDelete = LessonProvider.createRandomLesson();
        Long lessonIdToDelete = lessonToDelete.getId();
        when(lessonRepository.findById(lessonIdToDelete)).thenReturn(Optional.of(lessonToDelete));

        assertTrue(lessonService.deleteLessonById(lessonIdToDelete));
        verify(lessonRepository, times(1)).findById(lessonIdToDelete);
    }

    @Test
    void deleteLessonById_lessonToBeDeletedDoesntExists_false() {
        Long lessonIdToDelete = LessonProvider.getRandomId();
        when(lessonRepository.findById(lessonIdToDelete)).thenReturn(Optional.empty());

        assertFalse(lessonService.deleteLessonById(lessonIdToDelete));
        verify(lessonRepository, times(1)).findById(lessonIdToDelete);

    }
}