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

    public void updateLesson(Lesson lessonOld, Lesson lessonNew) {
        lessonOld.setTopic(lessonNew.getTopic());
        lessonOld.setLessonContent(lessonNew.getLessonContent());
    }



    public boolean deleteLessonById(Long id) {
        Optional<Lesson> lesson = lessonRepository.findById(id);
        if(lesson.isPresent()){
            lessonRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
