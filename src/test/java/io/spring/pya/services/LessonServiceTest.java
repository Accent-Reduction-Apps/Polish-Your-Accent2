package io.spring.pya.services;

import io.spring.pya.entities.Lesson;
import io.spring.pya.providers.LessonProvider;
import io.spring.pya.repositories.LessonRepository;
import io.spring.pya.util.UtilRandomNumber;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
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