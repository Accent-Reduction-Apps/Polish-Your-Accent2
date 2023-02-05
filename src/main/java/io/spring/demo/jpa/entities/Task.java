package io.spring.demo.jpa.entities;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lesson_lesson_id")
    private Lesson lesson;

    @Column(name = "name")
    private String name;

    @Column(name = "start_date")
    private Instant start_date;

    @Column(name = "end_date")
    private Instant end_date;

    @ManyToOne
    @JoinColumn(name = "assignee_user_id")
    private User assignee;




    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    public Instant getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Instant end_date) {
        this.end_date = end_date;
    }

    public Instant getStart_date() {
        return start_date;
    }

    public void setStart_date(Instant start_date) {
        this.start_date = start_date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}