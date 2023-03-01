package io.spring.pya.controllers;

import io.spring.pya.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.mock;

class AdminControllerTest {

    private UserService userService;
    private AdminController AdminController;

    @BeforeEach
    void setUp() {
        userService = mock(UserService.class);
        AdminController = new AdminController(userService);
    }

    @Test
    void activateUser() {
    }

    @Test
    void deactivateUser() {
    }
}