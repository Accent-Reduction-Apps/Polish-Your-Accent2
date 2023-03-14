package io.spring.pya.controllers;


import io.spring.pya.entities.UserStudent;
import io.spring.pya.exceptions.ResourceNotFoundException;
import io.spring.pya.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
    UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserStudent> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public UserStudent getUserById(@PathVariable("userId") Long id) {
        return userService.getUserById(id);
    }

    @PostMapping()
    public void addUser(@RequestBody UserStudent userStudent) {
        userService.addUser(userStudent);
    }

    @PutMapping("/{userID}")
    public Object updateUser(@PathVariable("userID") Long id, @RequestBody UserStudent userStudentNew){
            UserStudent userStudentOld = userService.getUserById(id);
            if(userStudentOld!= null){
                userService.updateUser(userStudentOld, userStudentNew);
                return userStudentOld;
            }else{
                return String.format("No user found with id %d", id);
            }
    }


    @DeleteMapping("/{userID}")
    public boolean deleteUser(@PathVariable("userID") Long id){
        return userService.deleteUserById(id);
    }

    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @PatchMapping("/addReadLesson")
    public Object addReadLessonToLessonsSet(@RequestParam("lesson_id") Long lesson_id,
                                            @RequestParam("userStudent_id") Long userStudent_id) {

        UserStudent userStudent = userService.getUserById(userStudent_id);

        if(userStudent!= null){
            return userService.updateUserLessonList(userStudent, lesson_id);
        }else{
            return String.format("No user found with id %d", userStudent_id);
        }
    }


    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @PostMapping("/registerStudent")
    public ResponseEntity<UserStudent> sendRequestNewStudentAccountCreate(@RequestParam("password") String password,
                                                                          @RequestParam("email") String email,
                                                                          @RequestParam("name") String name) {
        UserStudent newStudent = userService.createNewStudent(email, password, name);
        return ResponseEntity.ok(newStudent);
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS}, allowedHeaders = {"Origin", "Content-Type", "Accept"})
    @PostMapping("/{userId}/activate")

    public ResponseEntity<?> activateUser(@PathVariable Long userId) {
        UserStudent activatedUser = userService.activateUser(userId);
        if (activatedUser != null) {
            return new ResponseEntity<>(activatedUser, HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("User", userId);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS}, allowedHeaders = {"Origin", "Content-Type", "Accept"})
    @PostMapping("/{userId}/deactivate")

    public ResponseEntity<?> deactivateUser(@PathVariable Long userId) {
        UserStudent deactivatedUser = userService.deactivateUser(userId);
        if (deactivatedUser != null) {
            return new ResponseEntity<>(deactivatedUser, HttpStatus.OK);
        } else {
            throw new ResourceNotFoundException("User", userId);
        }
    }

}
