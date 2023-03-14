package io.spring.pya.controllers;

import io.spring.pya.entities.UserStudent;
import io.spring.pya.providers.UserProvider;
import io.spring.pya.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class UserControllerTest {
    private UserService userService;
    private UserController userController;

    @BeforeEach
    void setUp() {
        userService = mock(UserService.class);
        userController = new UserController(userService);
    }

    @Test
    void activateUser_userExists_200() {
        UserStudent userToActivate = UserProvider.createRandomUser();
        UserStudent userActivated = UserProvider.deepCopyUser(userToActivate);
        UserProvider.activateUserAccount(userToActivate);
        when(userService.activateUser(userToActivate.getId())).thenReturn(userActivated);

        ResponseEntity<?> response = userController.activateUser(userToActivate.getId());

        verify(userService, times(1)).activateUser(userActivated.getId());
        assertEquals(response.getBody(), userActivated);
        assertEquals(response.getStatusCode(), HttpStatusCode.valueOf(200));
    }

    @Test
    void deactivateUser() {
        UserStudent userToDeactivate = UserProvider.createRandomUser();
        UserProvider.activateUserAccount(userToDeactivate);
        UserStudent userDeactivated = UserProvider.deepCopyUser(userToDeactivate);
        UserProvider.deactivateUserAccount(userDeactivated);
        when(userService.deactivateUser(userToDeactivate.getId())).thenReturn(userDeactivated);

        ResponseEntity<?> response = userController.deactivateUser(userToDeactivate.getId());

        verify(userService, times(1)).deactivateUser(userDeactivated.getId());
        assertEquals(response.getBody(), userDeactivated);
        assertEquals(response.getStatusCode(), HttpStatusCode.valueOf(200));
    }
}