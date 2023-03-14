package io.spring.pya.services;


import io.spring.pya.entities.Lesson;
import io.spring.pya.entities.UserStudent;
import io.spring.pya.repositories.LessonRepository;
import io.spring.pya.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;

    public UserService(UserRepository userRepository, LessonRepository lessonRepository) {
        this.userRepository = userRepository;
        this.lessonRepository = lessonRepository;
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

        if (stringDataUpdated(userStudentNew.getUsername())) userStudentOld.setUsername(userStudentNew.getUsername());
        if (stringDataUpdated(userStudentNew.getEmail()))
            userStudentOld.setEmail(userStudentNew.getEmail());
        if (stringDataUpdated(userStudentNew.getPassword())) userStudentOld.setPassword(userStudentNew.getPassword());
        if (setDataUpdated(userStudentNew.getLessons())) userStudentOld.setLessons(userStudentNew.getLessons());

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

    private boolean stringDataUpdated(String string) {
        return string != null && !string.equals("");
    }

    private boolean setDataUpdated(Set<Lesson> userLessonsSet) {
        return userLessonsSet != null && !userLessonsSet.isEmpty();
    }

    public UserStudent activateUser(Long userId) {
        UserStudent userStudent;
        if (userRepository.findById(userId).isEmpty()) {
            return null;
        } else {
            userStudent = userRepository.findById(userId).get();
        }
        userStudent.setAccountNonExpired(true);
        userStudent.setAccountNonLocked(true);
        userStudent.setCredentialsNonExpired(true);
        userStudent.setEnabled(true);
        userRepository.save(userStudent);
        return userStudent;
    }

    public UserStudent deactivateUser(Long userId) {
        UserStudent userStudent;
        if (userRepository.findById(userId).isEmpty()) {
            return null;
        } else {
            userStudent = userRepository.findById(userId).get();
        }
        userStudent.setAccountNonExpired(false);
        userStudent.setAccountNonLocked(false);
        userStudent.setCredentialsNonExpired(false);
        userStudent.setEnabled(false);
        userRepository.save(userStudent);
        return userStudent;
    }

    public UserStudent updateUserLessonList(UserStudent userStudent, Long lesson_id) {
        Set<Lesson> userLessonsSet = userStudent.getLessons();
        Lesson newCompletedLesson = lessonRepository.getReferenceById(lesson_id);
        userLessonsSet.add(newCompletedLesson);
        return userRepository.saveAndFlush(userStudent);
    }
}
