package io.spring.pya.controllers;

import io.spring.pya.entities.AppSimpleGrantedAuthority;
import io.spring.pya.entities.UserStudent;
import io.spring.pya.payload.request.LoginRequest;
import io.spring.pya.payload.request.SignupRequest;
import io.spring.pya.payload.response.JwtResponse;
import io.spring.pya.payload.response.MessageResponse;
import io.spring.pya.repositories.GrantedAuthorityRepository;
import io.spring.pya.repositories.UserRepository;
import io.spring.pya.security.UserRole;
import io.spring.pya.security.jwt.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {
	private final
	AuthenticationManager authenticationManager;
	private final GrantedAuthorityRepository grantedAuthorityRepository;
	private final
	PasswordEncoder encoder;
	private final
	JwtUtils jwtUtils;

	private final UserRepository userRepository;

	public AuthController(AuthenticationManager authenticationManager,
						  GrantedAuthorityRepository grantedAuthorityRepository,
						  PasswordEncoder encoder,
						  JwtUtils jwtUtils,
						  UserRepository userRepository
	) {
		this.authenticationManager = authenticationManager;
		this.grantedAuthorityRepository = grantedAuthorityRepository;
		this.encoder = encoder;
		this.jwtUtils = jwtUtils;
		this.userRepository = userRepository;
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		UserStudent userDetails = (UserStudent) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt,
				userDetails.getId(),
				userDetails.getUsername(),
				userDetails.getEmail(),
				roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		UserStudent user = new UserStudent(signUpRequest.getUsername(),
				signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));
		String role = signUpRequest.getRole();
		UserRole userRole;
		List<AppSimpleGrantedAuthority> userAuthorities;
		if (role == null) {
			userRole = UserRole.STUDENT;
		} else {
			userRole = UserRole.valueOf(user.getRole());

		}
		userAuthorities = userRole.getGrantedAuthorities(user);
		user.setRole(userRole.name());
		user.setAuthorities(userAuthorities);
		userRepository.save(user);
		grantedAuthorityRepository.saveAll(userAuthorities);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}
