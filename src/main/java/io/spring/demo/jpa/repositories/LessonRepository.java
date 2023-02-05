package io.spring.demo.jpa.repositories;

import io.spring.demo.jpa.entities.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByTopic(String topic);
}