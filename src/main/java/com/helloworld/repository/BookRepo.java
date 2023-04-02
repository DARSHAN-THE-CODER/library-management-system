package com.helloworld.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helloworld.model.Book;
import com.helloworld.model.User;

public interface BookRepo extends JpaRepository<Book, Integer>{

    Book findById(Long bookId);

    Book findByIsbn(String isbn);

}
