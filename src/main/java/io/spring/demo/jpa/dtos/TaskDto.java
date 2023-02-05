package io.spring.demo.jpa.dtos;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link io.spring.demo.jpa.entities.Task} entity
 */
public class TaskDto implements Serializable {
    private final Long id;
    private final String name;
    private final Instant start_date;
    private final Instant end_date;
    private final UserDto assignee;

    public TaskDto(Long id, String name, Instant start_date, Instant end_date, UserDto assignee) {
        this.id = id;
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.assignee = assignee;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Instant getStart_date() {
        return start_date;
    }

    public Instant getEnd_date() {
        return end_date;
    }

    public UserDto getAssignee() {
        return assignee;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskDto entity = (TaskDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.name, entity.name) &&
                Objects.equals(this.start_date, entity.start_date) &&
                Objects.equals(this.end_date, entity.end_date) &&
                Objects.equals(this.assignee, entity.assignee);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, start_date, end_date, assignee);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "name = " + name + ", " +
                "start_date = " + start_date + ", " +
                "end_date = " + end_date + ", " +
                "assignee = " + assignee + ")";
    }
}