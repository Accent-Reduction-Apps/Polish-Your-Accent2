package io.spring.demo.jpa.dtos;

import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the {@link io.spring.demo.jpa.entities.Lesson} entity
 */
public class LessonDto implements Serializable {
    private final Long id;
    @Size(max = 255)
    private final String text;
    @Size(max = 255)
    private final String topic;


    public LessonDto(Long id, String text, String topic) {
        this.id = id;
        this.text = text;
        this.topic = topic;

    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public String getTopic() {
        return topic;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LessonDto entity = (LessonDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.text, entity.text) &&
                Objects.equals(this.topic, entity.topic);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, topic);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "text = " + text + ", " +
                "topic = " + topic + ")";
    }
}