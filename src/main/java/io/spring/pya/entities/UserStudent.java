package io.spring.pya.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "users")
public class UserStudent implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long id;

    @Size(max = 255)
    @Column(name = "email_address")
    @Email
    private String email;

    @Size(max = 255)
    @Column(name = "name")
    private String username;

    @Size(max = 255)
    @Column(name = "password")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_user_lessons",
            joinColumns = @JoinColumn(name = "user_student_user_id"),
            inverseJoinColumns = @JoinColumn(name = "user_lessons_lesson_id"))
    private Set<Lesson> lessons = new LinkedHashSet<>();

    @OneToMany(mappedBy = "userStudent", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<AppSimpleGrantedAuthority> authorities;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;
    private String role;

    public UserStudent(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public UserStudent(Long id, String email, String username, String password, Set<Lesson> lessons) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.lessons = lessons;
    }

    public UserStudent() {
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String emailAddress) {
        this.email = emailAddress;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String name) {
        this.username = name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        this.accountNonExpired = accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
    }

    public void addAuthority(AppSimpleGrantedAuthority appSimpleGrantedAuthority) {
        this.authorities.add(appSimpleGrantedAuthority);
    }

    @Override
    public String toString() {
        return "UserStudent{" +
                "id=" + id +
                ", emailAddress='" + email + '\'' +
                ", name='" + username + '\'' +
                ", password='" + password + '\'' +
                ", lessons=" + lessons +
                '}';
    }

    public void setAuthorities(List<AppSimpleGrantedAuthority> authorities) {
        this.authorities = authorities;
    }
}