package io.spring.demo.jpa.controllers;

import io.spring.demo.jpa.dtos.LessonDto;
import io.spring.demo.jpa.entities.Lesson;
import io.spring.demo.jpa.mappers.LessonMapper;
import io.spring.demo.jpa.repositories.LessonRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/vi/project")
public class LessonController {
    private final LessonRepository lessonRepository;

    private final LessonMapper lessonMapper;


    public LessonController(LessonRepository lessonRepository,
                            LessonMapper lessonMapper) {
        this.lessonRepository = lessonRepository;
        this.lessonMapper = lessonMapper;
    }


    @GetMapping("/find/{topic}")
    public List<LessonDto> findByName(@PathVariable String topic) {
        return lessonRepository.findByTopic(topic)
                .stream()
                .map(lessonMapper::toDto)
                .collect(Collectors.toList());

    }

    @PostMapping("/new")
    public LessonDto saveProject (@RequestBody @NotNull @Valid LessonDto lessonDto){
        Lesson lesson = lessonMapper.toEntity(lessonDto);
        return lessonMapper.toDto(lessonRepository.save(lesson));

    }

    @PostMapping("/update")
    public LessonDto updateLesson(@RequestBody @NotNull @Valid LessonDto lessonDto){
        if(lessonDto.getId() == null){
            throw new IllegalArgumentException("Lesson Id is missing. Use endpoint '/new'  to create a lesson");
        }
        Lesson lesson = lessonRepository.findById(lessonDto.getId()).orElseThrow();

        Lesson updatedLesson = lessonMapper.partialUpdate(lessonDto, lesson);
        return lessonMapper.toDto(lessonRepository.save(updatedLesson));

    }


}
