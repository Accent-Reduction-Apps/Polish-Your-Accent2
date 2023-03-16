package io.spring.pya.entities;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.Assert;

@Entity
@Table(name = "app_simple_granted_authority")
public class AppSimpleGrantedAuthority implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "authority_id", nullable = false)
    private Long id;
    private String authority;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserStudent userStudent;

    public AppSimpleGrantedAuthority(String authority, UserStudent user) {
        Assert.hasText(authority, "A granted authority textual representation is required");
        this.authority = authority;
        this.userStudent = user;
    }

    public AppSimpleGrantedAuthority() {

    }

    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        } else {
            return obj instanceof AppSimpleGrantedAuthority && this.authority.equals(((AppSimpleGrantedAuthority) obj).authority);
        }
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserStudent getUserStudent() {
        return userStudent;
    }

    public void setUserStudent(UserStudent userStudent) {
        this.userStudent = userStudent;
    }
}