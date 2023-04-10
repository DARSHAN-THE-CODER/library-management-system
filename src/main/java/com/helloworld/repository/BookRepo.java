package com.helloworld.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helloworld.model.Book;
import com.helloworld.model.User;

public interface BookRepo extends JpaRepository<Book, Long>{

    // Book findById(Long bookId);

    Book findByIsbn(String isbn);

    void save(Optional<Book> book);

}
