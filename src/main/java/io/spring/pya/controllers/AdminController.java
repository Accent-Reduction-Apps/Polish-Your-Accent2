package io.spring.pya.controllers;

import io.spring.pya.entities.UserStudent;
import io.spring.pya.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {


    private final UserService userService;

    public AdminController(
            UserService userService
    ) {

        this.userService = userService;
    }

    @PostMapping("/user/{userId}/activate")
    public ResponseEntity<?> activateUser(@PathVariable Long userId) {
        UserStudent activatedUser = userService.activateUser(userId);
        return new ResponseEntity<>(activatedUser, HttpStatus.OK);
    }

    @PostMapping("/user/{userId}/deactivate")
    public ResponseEntity<?> deactivateUser(@PathVariable Long userId) {
        UserStudent deactivatedUser = userService.deactivateUSer(userId);
        return new ResponseEntity<>(deactivatedUser, HttpStatus.OK);
    }
}

