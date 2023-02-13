package io.spring.pya.controllers;


import io.spring.pya.entities.Lesson;
import io.spring.pya.exceptions.lesson.LessonNotFoundException;
import io.spring.pya.services.LessonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lessons")
public class LessonController {
    LessonService lessonService;


    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping
    public List<Lesson> getAllLessons() {
        return lessonService.getAllLessons();
    }

    @GetMapping("/{lessonId}")
    public Lesson getLessonById(@PathVariable("lessonId") Long id) {
        return lessonService.getLessonById(id);
    }

    @PostMapping()
    public void addLesson(@RequestBody Lesson lesson) {
        lessonService.addLesson(lesson);
    }

    @PutMapping("/{lessonId}")
    public Lesson updateLesson(@PathVariable("lessonId") Long id, @RequestBody Lesson lessonNew) throws LessonNotFoundException {
        Lesson lessonOld = lessonService.getLessonById(id);
        if (lessonOld != null) {
            lessonService.updateLesson(lessonOld, lessonNew);
            return lessonOld;
        } else {
            throw new LessonNotFoundException(id);
        }
    }

    @DeleteMapping("/{lessonId}")
    public boolean deleteLesson(@PathVariable("lessonId") Long id){
        return lessonService.deleteLessonById(id);
    }


}
