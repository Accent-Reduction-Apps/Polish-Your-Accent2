package com.pya.repositories;

import com.pya.entities.UserStudent;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<UserStudent, Long> {
}
