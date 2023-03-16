package io.spring.pya.security;

import io.spring.pya.security.jwt.AuthEntryPointJwt;
import io.spring.pya.security.jwt.AuthTokenFilter;
import io.spring.pya.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final AuthEntryPointJwt unauthorizedHandler;

    public SecurityConfig(PasswordEncoder passwordEncoder, UserService userService, AuthEntryPointJwt unauthorizedHandler) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.unauthorizedHandler = unauthorizedHandler;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/", "/js/**", "/css/**", "/webjars/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/users/**").hasAuthority(UserPermission.USERS_VIEW.getPermission())
                        .requestMatchers(HttpMethod.POST, "/users/**").hasAuthority(UserPermission.USERS_ADD.getPermission())
                        .requestMatchers(HttpMethod.PUT, "/users/**").hasAuthority(UserPermission.USERS_CHANGE.getPermission())
                        .requestMatchers(HttpMethod.DELETE, "/users/**").hasAuthority(UserPermission.USERS_DELETE.getPermission())
                        .requestMatchers(HttpMethod.PATCH, "/users/**").hasAuthority(UserPermission.USERS_CHANGE.getPermission())
                        .requestMatchers(HttpMethod.GET, "/lessons/**").hasAuthority(UserPermission.LESSONS_VIEW.getPermission())
                        .requestMatchers(HttpMethod.POST, "/lessons/**").hasAuthority(UserPermission.LESSONS_ADD.getPermission())
                        .requestMatchers(HttpMethod.PUT, "/lessons/**").hasAuthority(UserPermission.LESSONS_CHANGE.getPermission())
                        .requestMatchers(HttpMethod.DELETE, "/lessons/**").hasAuthority(UserPermission.LESSONS_DELETE.getPermission())
                        .requestMatchers("**/activate").hasAuthority(UserRole.ADMIN.name())
                        .requestMatchers("**/deactivate").hasAuthority(UserRole.ADMIN.name())
                        .anyRequest().permitAll()
                )
                .formLogin((form) -> {
                            try {
                                form
                                        .successForwardUrl("/lessons")
                                        .permitAll()
                                        .usernameParameter("username")
                                        .and()
                                        .rememberMe().rememberMeCookieName("remember-me");
                            } catch (Exception e) {
                                throw new RuntimeException(e);
                            }
                        }
                )
                .logout((logout) -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))
                        .clearAuthentication(true)
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID", "remember-me")
                        .logoutSuccessUrl("/login")
                );
        http.authenticationProvider(daoAuthenticationProvider());
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userService);
        return provider;
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(daoAuthenticationProvider());
        return authenticationManagerBuilder.build();
    }

}
