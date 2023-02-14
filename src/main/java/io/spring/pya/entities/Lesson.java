package io.spring.pya.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

@Entity
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Size(max = 255)
    private String lessonContent;

    @Size(max = 255)
    private String topic;

    public Lesson() {

    }

    public Lesson(Long id, String lessonContent, String topic) {
        this.id = id;
        this.lessonContent = lessonContent;
        this.topic = topic;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLessonContent() {
        return lessonContent;
    }

    public void setLessonContent(String text) {
        this.lessonContent = text;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

}