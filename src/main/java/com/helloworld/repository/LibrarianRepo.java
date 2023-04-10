package com.helloworld.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helloworld.model.Librarian;

public interface LibrarianRepo extends JpaRepository<Librarian, Long> {

    Librarian findByEmail(String email);

    Optional<Librarian> findById(Long librarianId);
    
}
