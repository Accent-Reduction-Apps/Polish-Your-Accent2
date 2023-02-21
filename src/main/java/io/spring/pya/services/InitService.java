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
        if (userRepository.findByUsername("userTest").isEmpty()) {
            UserStudent userTest = new UserStudent();
            userTest.setUsername("userTest");
            userTest.setEmailAddress("userTest@email.com");
            userTest.setPassword(passwordEncoder.encode("userTest"));
            userTest.setEnabled(true);
            userTest.setCredentialsNonExpired(true);
            userTest.setAccountNonExpired(true);
            userTest.setAccountNonLocked(true);
            userTest.setRole(UserRole.ADMIN.name());
            List<AppSimpleGrantedAuthority> sonAuthorities = UserRole.ADMIN.getGrantedAuthorities(userTest);
            userTest.setAuthorities(sonAuthorities);
            userRepository.saveAndFlush(userTest);
            grantedAuthorityRepository.saveAll(sonAuthorities);
        }
    }
}
