package io.spring.pya.repositories;

import io.spring.pya.entities.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByTopic(String topic);
}