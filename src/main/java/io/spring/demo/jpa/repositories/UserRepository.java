package io.spring.demo.jpa.repositories;

import io.spring.demo.jpa.entities.UserStudent;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<UserStudent, Long> {
}
