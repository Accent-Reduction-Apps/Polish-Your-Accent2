package io.spring.pya.controllers;


import io.spring.pya.entities.UserStudent;
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
    public Object addIngredientToPotion(@PathVariable("userID") Long id, @RequestBody UserStudent userStudentNew){
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
    @PostMapping("/registerStudent")
    public ResponseEntity<UserStudent> sendRequestNewStudentAccountCreate(@RequestParam("password") String password,
                                                                          @RequestParam("email") String email,
                                                                          @RequestParam("name") String name)
    {
        UserStudent newStudent = userService.createNewStudent(email, password, name);
        return ResponseEntity.ok(newStudent);
    }

}
