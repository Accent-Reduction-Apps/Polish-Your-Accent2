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

    public void addTestUser() {
        UserStudent userTest;
        if (userRepository.findByUsername("userTest").isEmpty()) {
            userTest = new UserStudent();
        } else {
            userTest = userRepository.findByUsername("userTest").get();
        }
        userTest.setUsername("userTest");
        userTest.setEmailAddress("userTest@email.com");
        userTest.setPassword(passwordEncoder.encode("userTest"));
        userTest.setEnabled(true);
        userTest.setCredentialsNonExpired(true);
        userTest.setAccountNonExpired(true);
        userTest.setAccountNonLocked(true);
        userTest.setRole(UserRole.ADMIN.name());
        List<AppSimpleGrantedAuthority> userAuthorities = UserRole.ADMIN.getGrantedAuthorities(userTest);
        userTest.setAuthorities(userAuthorities);
        userRepository.saveAndFlush(userTest);
        grantedAuthorityRepository.saveAll(userAuthorities);

    }
}
