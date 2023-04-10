package com.helloworld.repository;

import com.helloworld.model.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepo extends JpaRepository<Administrator, Long> {

    Administrator findByEmail(String email);
    
}
