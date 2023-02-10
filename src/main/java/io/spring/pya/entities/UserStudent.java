package io.spring.pya.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.LinkedHashSet;
import java.util.Set;


@Entity
@Table(name = "users")
public class UserStudent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Size(max = 255)
    @Column(name = "email_address")
    private String emailAddress;

    @Size(max = 255)
    @Column(name = "name")
    private String name;

    @Size(max = 255)
    @Column(name = "password")
    private String password;

    @ManyToMany
    @JoinTable(name = "users_user_lessons",
            joinColumns = @JoinColumn(name = "user_student_user_id"),
            inverseJoinColumns = @JoinColumn(name = "user_lessons_lesson_id"))
    private Set<Lesson> lessons = new LinkedHashSet<>();

    public UserStudent(String name, String emailAddress, String password) {
        this.name = name;
        this.emailAddress = emailAddress;
        this.password = password;
    }

    public UserStudent(Long id, String emailAddress, String name, String password, Set<Lesson> lessons) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.name = name;
        this.password = password;
        this.lessons = lessons;
    }

    public UserStudent() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
    }

}