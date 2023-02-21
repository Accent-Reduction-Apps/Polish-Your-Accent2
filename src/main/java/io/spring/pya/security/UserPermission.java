package io.spring.pya.security;

public enum UserPermission {
    LESSONS_READ("lessons:read"),
    LESSONS_WRITE("lessons:write"),
    LESSONS_DELETE("lessons:delete"),
    USERS_READ("users:read"),
    USERS_WRITE("users:write"),
    USERS_DELETE("users:delete");

    private final String permission;

    UserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
