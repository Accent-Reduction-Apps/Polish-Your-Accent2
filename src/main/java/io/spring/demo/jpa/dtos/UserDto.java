package io.spring.demo.jpa.dtos;

import io.spring.demo.jpa.entities.UserStudent;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link UserStudent} entity
 */
public class UserDto implements Serializable {
    private final Long id;
    @Size(max = 255)
    private final String emailAddress;
    @Size(max = 255)
    private final String name;
    @Size(max = 255)
    private final String password;
    @Email(message = "Incorrect email")
    private final String emailName;

    public UserDto(Long id, String emailAddress, String name, String password, String emailName) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.name = name;
        this.password = password;
        this.emailName = emailName;
    }

    public Long getId() {
        return id;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public String getEmailName() {
        return emailName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto entity = (UserDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.emailAddress, entity.emailAddress) &&
                Objects.equals(this.name, entity.name) &&
                Objects.equals(this.password, entity.password) &&
                Objects.equals(this.emailName, entity.emailName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, emailAddress, name, password, emailName);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "emailAddress = " + emailAddress + ", " +
                "name = " + name + ", " +
                "password = " + password + ", " +
                "emailName = " + emailName + ")";
    }
}