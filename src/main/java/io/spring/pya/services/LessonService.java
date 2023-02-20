package io.spring.pya.services;



import io.spring.pya.entities.Lesson;
import io.spring.pya.repositories.LessonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LessonService {
    private final LessonRepository lessonRepository;

    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    public void addLesson(Lesson lesson) {
    lessonRepository.saveAndFlush(lesson);
    }

    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }

    public Lesson getLessonById(Long id) {
        Optional<Lesson> lesson = lessonRepository.findById(id);
        return lesson.orElse(null);
    }

    public Lesson updateLesson(Long oldLessonId, Lesson newLesson) {
        if( newLesson.getTopic() == null|| newLesson.getTopic().trim().equals("") ){
            throw new IllegalArgumentException("The argument for Topic cannot be 'null' when updating lesson");
        }
        Lesson oldLesson = lessonRepository.getReferenceById(oldLessonId);
        oldLesson.setLessonContent(newLesson.getLessonContent());
        oldLesson.setTopic(newLesson.getTopic());
        lessonRepository.save(oldLesson);
        return lessonRepository.getReferenceById(oldLessonId);
    }

    public boolean deleteLessonById(Long id) {
        Optional<Lesson> lesson = lessonRepository.findById(id);
        if (lesson.isPresent()) {
            lessonRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
