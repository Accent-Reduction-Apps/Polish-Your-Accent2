package com.pya.controllers;


import com.pya.entities.Lesson;
import com.pya.services.LessonService;
import com.pya.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/lessons")
public class LessonController {
    LessonService lessonService;


    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping
    public ResponseEntity<List<Lesson>> getAllLessons() {
        return new ResponseEntity<>(lessonService.getAllLessons(), HttpStatus.OK);
    }

    @GetMapping("/{lessonId}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable("lessonId") Long id) {
        Lesson foundLesson = lessonService.getLessonById(id);
        if (foundLesson != null) {
            return new ResponseEntity<>(foundLesson, HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("Lesson", id);
        }

    }

    @PostMapping()
    public void addLesson(@RequestBody Lesson lesson) {
        lessonService.addLesson(lesson);
    }

    @PutMapping("/{lessonId}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable("lessonId") Long id, @RequestBody Lesson lessonNew) throws ResourceNotFoundException {
        if (lessonService.getLessonById(id) != null) {
            Lesson updatedLesson = lessonService.updateLesson(id, lessonNew);
            return new ResponseEntity<>(updatedLesson, HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("Lesson", id);
        }
    }

    @DeleteMapping("/{lessonId}")
    public ResponseEntity<Lesson> deleteLesson(@PathVariable("lessonId") Long id) {
        if (lessonService.deleteLessonById(id)) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(204));
        } else {
            throw new ResourceNotFoundException("Lesson", id);
        }
    }


}
