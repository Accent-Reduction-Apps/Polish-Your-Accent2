package io.spring.pya.services;



import io.spring.pya.entities.UserStudent;
import io.spring.pya.repositories.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public void addUser(UserStudent userStudent) {
    userRepository.saveAndFlush(userStudent);
    }

    public List<UserStudent> getAllUsers() {
        return userRepository.findAll();
    }

    public UserStudent getUserById(Long id) {
        Optional<UserStudent> user = userRepository.findById(id);
        return user.orElse(null);
    }

    public UserStudent updateUser(UserStudent userStudentOld, UserStudent userStudentNew) {
        if(userStudentNew.getEmailAddress() == null || userStudentNew.getName() == null || userStudentNew.getName().trim().equals("") || userStudentNew.getEmailAddress().equals("") ){
            throw new IllegalArgumentException("The argument for Name and Email Address cannot be 'null' when updating lesson");
        }
        userStudentOld.setName(userStudentNew.getName());
        userStudentOld.setEmailAddress(userStudentNew.getEmailAddress());
        userStudentOld.setPassword(userStudentNew.getPassword());
        userRepository.save(userStudentOld);
        return userRepository.getReferenceById(userStudentOld.getId());
    }

    public boolean deleteUserById(Long id) {
        Optional<UserStudent> user = userRepository.findById(id);
        if(user.isPresent()){
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }


    public UserStudent createNewStudent(String emailAddress, String password, String name) {
        UserStudent userStudent = new UserStudent(name,emailAddress,password);
        return userRepository.saveAndFlush(userStudent);
    }
}
