package io.spring.pya.repositories;

import io.spring.pya.entities.AppSimpleGrantedAuthority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrantedAuthorityRepository extends JpaRepository<AppSimpleGrantedAuthority, Long> {
}
