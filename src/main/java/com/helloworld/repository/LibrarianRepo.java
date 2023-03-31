package com.helloworld.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helloworld.model.Librarian;

public interface LibrarianRepo extends JpaRepository<Librarian, Integer> {
    
}
