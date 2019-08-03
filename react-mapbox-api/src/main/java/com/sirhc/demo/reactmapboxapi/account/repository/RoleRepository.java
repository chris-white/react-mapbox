package com.sirhc.demo.reactmapboxapi.account.repository;

import com.sirhc.demo.reactmapboxapi.account.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}