package io.spring.pya.controllers;

import io.spring.pya.payload.response.MessageResponse;
import io.spring.pya.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {


    private final UserRepository userRepository;

    public AdminController(
            UserRepository userRepository
    ) {

        this.userRepository = userRepository;
    }

    @PostMapping("/user/{userId}/activate")
    public ResponseEntity<?> activateUser(@PathVariable String userId) {

        return ResponseEntity.ok(new MessageResponse("User account activated successfully"));
    }

    @PostMapping("/user/{userId}/deactivate")
    public ResponseEntity<?> deactivateUser(@PathVariable String userId) {

        return ResponseEntity.ok(new MessageResponse("User account deactivated successfully"));
    }
}

