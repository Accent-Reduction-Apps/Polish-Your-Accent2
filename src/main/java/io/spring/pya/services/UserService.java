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

        if(stringDataUpdated(userStudentNew.getName())) userStudentOld.setName(userStudentNew.getName());
        if(stringDataUpdated(userStudentNew.getEmailAddress())) userStudentOld.setName(userStudentNew.getEmailAddress());
        if(stringDataUpdated(userStudentNew.getPassword())) userStudentOld.setName(userStudentNew.getPassword());

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

    private boolean stringDataUpdated (String string){
        return string != null && !string.equals("");
    }


}
