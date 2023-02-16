package io.spring.pya.controllers;


import io.spring.pya.entities.Lesson;
import io.spring.pya.exceptions.ResourceNotFoundException;
import io.spring.pya.services.LessonService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lessons")
public class LessonController {

    private static final Logger LOGGER = LoggerFactory.getLogger(LessonController.class);
    LessonService lessonService;


    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping
    public ResponseEntity<List<Lesson>> getAllLessons() {
        LOGGER.info("get all lessons");
        return new ResponseEntity<>(lessonService.getAllLessons(), HttpStatus.OK);
    }

    @GetMapping("/{lessonId}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable("lessonId") Long id) {
        Lesson foundLesson = lessonService.getLessonById(id);
        if (foundLesson != null) {
            LOGGER.info("get lesson : " + id);
            return new ResponseEntity<>(foundLesson, HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("Lesson", id);
        }
    }

    @PostMapping()
    public void addLesson(@RequestBody Lesson lesson) {
        LOGGER.info("Add lesson :\n" + lesson);
        lessonService.addLesson(lesson);
    }

    @PutMapping("/{lessonId}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable("lessonId") Long id, @RequestBody Lesson lessonNew) throws ResourceNotFoundException {
        Lesson oldLesson = lessonService.getLessonById(id);
        if (oldLesson != null) {
            Lesson updatedLesson = lessonService.updateLesson(id, lessonNew);
            if (updatedLesson == null) {
                //only possible if save fail
                throw new ResourceNotFoundException("Lesson", id);
            }
            LOGGER.info("Update lesson " + oldLesson + "\nwith\n" + lessonNew);
            return new ResponseEntity<>(updatedLesson, HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("Lesson", id);
        }
    }

    @DeleteMapping("/{lessonId}")
    public ResponseEntity<Lesson> deleteLesson(@PathVariable("lessonId") Long id) {
        if (lessonService.deleteLessonById(id)) {
            LOGGER.info("Delete lesson with id : " + id);
            return new ResponseEntity<>(HttpStatusCode.valueOf(204));
        } else {
            throw new ResourceNotFoundException("Lesson", id);
        }
    }


}
