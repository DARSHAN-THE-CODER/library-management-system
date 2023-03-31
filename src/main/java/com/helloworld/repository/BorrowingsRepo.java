package com.helloworld.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helloworld.model.Borrowings;

public interface BorrowingsRepo extends JpaRepository<Borrowings, Integer> {
    
}
