package io.spring.pya.repositories;

import io.spring.pya.entities.AppSimpleGrantedAuthority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrantedAuthorityRepository extends JpaRepository<AppSimpleGrantedAuthority, Long> {

    List<AppSimpleGrantedAuthority> findByUserStudentId(Long id);

}
