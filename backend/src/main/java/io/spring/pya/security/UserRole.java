package io.spring.pya.security;

import io.spring.pya.entities.AppSimpleGrantedAuthority;
import io.spring.pya.entities.UserStudent;

import java.util.List;
import java.util.stream.Collectors;

public enum UserRole {
    ADMIN(List.of(UserPermission.values())),
    STAFF(List.of(UserPermission.values())),
    STUDENT(List.of(UserPermission.LESSONS_VIEW, UserPermission.LESSONS_CHANGE, UserPermission.USERS_VIEW, UserPermission.USERS_CHANGE));

    private final List<UserPermission> permissions;

    UserRole(List<UserPermission> permissions) {
        this.permissions = permissions;
    }

    public List<UserPermission> getPermissions() {
        return permissions;
    }

    public List<AppSimpleGrantedAuthority> getGrantedAuthorities(UserStudent user) {
        List<AppSimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new AppSimpleGrantedAuthority(permission.getPermission(), user))
                .collect(Collectors.toList());
        permissions.add(new AppSimpleGrantedAuthority(this.name(), user));
        return permissions;
    }

}
