package io.spring.pya.security;

public enum UserPermission {
    LESSONS_VIEW("lessons:view"),
    LESSONS_ADD("lessons:add"),
    LESSONS_CHANGE("lessons:change"),
    LESSONS_DELETE("lessons:delete"),
    USERS_VIEW("users:view"),
    USERS_ADD("users:add"),
    USERS_CHANGE("users:change"),
    USERS_DELETE("users:delete");

    private final String permission;

    UserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
