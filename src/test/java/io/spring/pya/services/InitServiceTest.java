package io.spring.pya.services;

import io.spring.pya.entities.AppSimpleGrantedAuthority;
import io.spring.pya.entities.UserStudent;
import io.spring.pya.repositories.GrantedAuthorityRepository;
import io.spring.pya.repositories.UserRepository;
import io.spring.pya.security.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class InitServiceTest {

    private InitService initService;
    private UserRepository userRepository;
    private GrantedAuthorityRepository grantedAuthorityRepository;
    @Captor
    private ArgumentCaptor<List<AppSimpleGrantedAuthority>> authoritiesListCapture = ArgumentCaptor.forClass(List.class);

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        grantedAuthorityRepository = mock(GrantedAuthorityRepository.class);
        initService = new InitService(
                userRepository,
                mock(PasswordEncoder.class),
                grantedAuthorityRepository
        );
    }

    @Test
    void addTestUsers() {

    }

    @ParameterizedTest
    @EnumSource(UserRole.class)
    void addTestUser_testUserDoesntExist_userAndPermissionsCorrespondingToGivenRoleAreSavedToDB(UserRole role) {
        UserStudent testUserToAdd = new UserStudent();
        testUserToAdd.setUsername("testUser");
        testUserToAdd.setRole(role.name());
        testUserToAdd.setAuthorities(role.getGrantedAuthorities(testUserToAdd));
        when(userRepository.findByUsername(testUserToAdd.getUsername())).thenReturn(Optional.empty());

        initService.addTestUser(testUserToAdd.getUsername(), UserRole.valueOf(testUserToAdd.getRole()));
        verify(userRepository, times(1)).findByUsername(testUserToAdd.getUsername());
        ArgumentCaptor<UserStudent> capturedUserBeingAdded = ArgumentCaptor.forClass(UserStudent.class);
        verify(userRepository).saveAndFlush(capturedUserBeingAdded.capture());
        assertEquals(testUserToAdd.getUsername(), capturedUserBeingAdded.getValue().getUsername());
        assertEquals(testUserToAdd.getRole(), capturedUserBeingAdded.getValue().getRole());
        assertEquals(testUserToAdd.getAuthorities(), capturedUserBeingAdded.getValue().getAuthorities());
        verify(grantedAuthorityRepository, times(1)).saveAll(authoritiesListCapture.capture());
        assertEquals(testUserToAdd.getAuthorities(), authoritiesListCapture.getValue());
    }
}