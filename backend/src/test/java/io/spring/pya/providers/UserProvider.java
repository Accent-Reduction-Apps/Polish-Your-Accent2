package io.spring.pya.providers;

import io.spring.pya.entities.AppSimpleGrantedAuthority;
import io.spring.pya.entities.UserStudent;
import io.spring.pya.util.UtilRandomNumber;

import java.util.HashSet;
import java.util.List;

public class UserProvider {
    public static UserStudent createRandomUser() {
        String username = getRandomUsername();
        return new UserStudent(
                getRandomId(),
                username + "@mail.com",
                username,
                getRandomWeakPassword(),
                new HashSet<>(LessonProvider.createRandomLessonsList(UtilRandomNumber.getRandomInt(1, 10)))
        );
    }

    public static UserStudent deepCopyUser(UserStudent userStudent) {
        UserStudent copy = new UserStudent();
        copy.setId(userStudent.getId());
        copy.setEmail(userStudent.getEmail());
        copy.setUsername(userStudent.getUsername());
        copy.setPassword(userStudent.getPassword());
        copy.setRole(userStudent.getRole());
        copy.setAuthorities((List<AppSimpleGrantedAuthority>) userStudent.getAuthorities());
        copy.setCredentialsNonExpired(userStudent.isCredentialsNonExpired());
        copy.setAccountNonLocked(userStudent.isAccountNonLocked());
        copy.setAccountNonExpired(userStudent.isAccountNonExpired());
        copy.setEnabled(userStudent.isEnabled());
        copy.setLessons(userStudent.getLessons());
        return copy;
    }

    public static void activateUserAccount(UserStudent userToActivate) {
        userToActivate.setEnabled(true);
        userToActivate.setCredentialsNonExpired(true);
        userToActivate.setAccountNonExpired(true);
        userToActivate.setAccountNonLocked(true);
    }

    public static Long getRandomId() {
        return UtilRandomNumber.getRandomLong();
    }

    public static String getRandomMail() {
        return getRandomUsername() + "@mail.com";
    }

    public static String getRandomWeakPassword() {
        return "randomWeakPassword" + UtilRandomNumber.getRandomLong();
    }

    public static String getRandomUsername() {
        return "randomUserName" + UtilRandomNumber.getRandomLong();
    }

    public static void deactivateUserAccount(UserStudent userToDeactivate) {
        userToDeactivate.setEnabled(false);
        userToDeactivate.setCredentialsNonExpired(false);
        userToDeactivate.setAccountNonExpired(false);
        userToDeactivate.setAccountNonLocked(false);
    }
}
