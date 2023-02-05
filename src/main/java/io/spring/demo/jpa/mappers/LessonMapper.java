package io.spring.demo.jpa.mappers;

import io.spring.demo.jpa.dtos.LessonDto;
import io.spring.demo.jpa.entities.Lesson;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface LessonMapper {
    Lesson toEntity(LessonDto lessonDto);

    LessonDto toDto(Lesson lesson);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Lesson partialUpdate(LessonDto lessonDto, @MappingTarget Lesson lesson);

    @AfterMapping
    default void linkTasks(@MappingTarget Lesson lesson) {
        lesson.getTasks().forEach(task -> task.setLesson(lesson));
    }
}