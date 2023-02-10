package io.spring.pya.repositories;

import io.spring.pya.entities.UserStudent;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<UserStudent, Long> {
}
