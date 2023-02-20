package io.spring.pya.services;


import io.spring.pya.entities.UserStudent;
import io.spring.pya.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
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

        if(stringDataUpdated(userStudentNew.getName())) userStudentOld.setUsername(userStudentNew.getUsername());
        if(stringDataUpdated(userStudentNew.getEmailAddress())) userStudentOld.setEmailAddress(userStudentNew.getEmailAddress());
        if(stringDataUpdated(userStudentNew.getPassword())) userStudentOld.setPassword(userStudentNew.getPassword());

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
        UserStudent userStudent = new UserStudent(name, emailAddress, password);
        return userRepository.saveAndFlush(userStudent);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s notfound", username)));
    }

    private boolean stringDataUpdated (String string){
        return string != null && !string.equals("");
    }


}
