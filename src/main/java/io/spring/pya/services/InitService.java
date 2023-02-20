package io.spring.pya.services;

import io.spring.pya.entities.AppSimpleGrantedAuthority;
import io.spring.pya.entities.UserStudent;
import io.spring.pya.repositories.GrantedAuthorityRepository;
import io.spring.pya.repositories.UserRepository;
import io.spring.pya.security.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InitService {

    private final PasswordEncoder passwordEncoder;
    private final GrantedAuthorityRepository grantedAuthorityRepository;
    private final UserRepository userRepository;

    @Autowired
    public InitService(PasswordEncoder passwordEncoder, GrantedAuthorityRepository grantedAuthorityRepository, UserRepository userRepository) {

        this.passwordEncoder = passwordEncoder;
        this.grantedAuthorityRepository = grantedAuthorityRepository;
        this.userRepository = userRepository;
    }

    // initialize the user in DB
    @Bean
    public CommandLineRunner initializeJpaData() {
        return (args) -> {

            UserStudent son = new UserStudent();
            son.setUsername("son");
            son.setPassword(passwordEncoder.encode("son"));
            son.setEnabled(true);
            son.setCredentialsNonExpired(true);
            son.setAccountNonExpired(true);
            son.setAccountNonLocked(true);
            son.setRole(UserRole.SON.name());
            List<AppSimpleGrantedAuthority> sonAuthorities = UserRole.SON.getGrantedAuthorities(son);
            son.setAuthorities(sonAuthorities);
            userRepository.saveAndFlush(son);
            for (AppSimpleGrantedAuthority authority : sonAuthorities
            ) {
                grantedAuthorityRepository.saveAndFlush(authority);
            }
        };


    }

}
