package io.spring.pya.security;

import io.spring.pya.entities.AppSimpleGrantedAuthority;
import io.spring.pya.entities.UserStudent;

import java.util.List;
import java.util.stream.Collectors;

public enum UserRole {
    DAD(List.of(UserPermission.DETAILS, UserPermission.READER)),
    SON(List.of(UserPermission.PRIVACY, UserPermission.DETAILS, UserPermission.EDITOR, UserPermission.READER)),
    MOM(List.of(UserPermission.PRIVACY));

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
//        permissions.add(new AppSimpleGrantedAuthority("ROLE_" + this.name(), user));//consider as table in db or leave as perm
        return permissions;
    }

}
