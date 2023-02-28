package io.spring.pya.services;

import io.spring.pya.entities.AppSimpleGrantedAuthority;
import io.spring.pya.entities.UserStudent;
import io.spring.pya.repositories.GrantedAuthorityRepository;
import io.spring.pya.repositories.UserRepository;
import io.spring.pya.security.UserRole;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InitService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GrantedAuthorityRepository grantedAuthorityRepository;

    public InitService(UserRepository userRepository, PasswordEncoder passwordEncoder, GrantedAuthorityRepository grantedAuthorityRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.grantedAuthorityRepository = grantedAuthorityRepository;
    }

    public void addTestUsers() {
        addTestUser("testUser", UserRole.STUDENT);
    }

    public void addTestUser(String name, UserRole role) {
        UserStudent testUser;
        if (userRepository.findByUsername(name).isEmpty()) {
            testUser = new UserStudent();
        } else {
            testUser = userRepository.findByUsername(name).get();
        }
        testUser.setUsername(name);
        testUser.setEmail(name + "@email.com");
        testUser.setPassword(passwordEncoder.encode(name));
        testUser.setEnabled(true);
        testUser.setCredentialsNonExpired(true);
        testUser.setAccountNonExpired(true);
        testUser.setAccountNonLocked(true);
        testUser.setRole(role.name());
        List<AppSimpleGrantedAuthority> userAuthorities = role.getGrantedAuthorities(testUser);
        testUser.setAuthorities(userAuthorities);
        userRepository.saveAndFlush(testUser);
        List<AppSimpleGrantedAuthority> previousRunUserTestAuthorities = grantedAuthorityRepository.findByUserStudentId(testUser.getId());
        grantedAuthorityRepository.deleteAll(previousRunUserTestAuthorities);
        grantedAuthorityRepository.saveAll(userAuthorities);
    }
}
