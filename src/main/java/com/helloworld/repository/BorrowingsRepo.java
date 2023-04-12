package com.helloworld.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.helloworld.controller.Borrowing;
import com.helloworld.model.Book;
import com.helloworld.model.Borrowings;
import com.helloworld.model.User;

public interface BorrowingsRepo extends JpaRepository<Borrowings, Long> {

    void save(Borrowing borrowing);

    // void findByBookIdAndUserId(Long bookId, Long userId);

    // List<Borrowings> findAll(Book book, User user);

    // Borrowings findByBookIdAndUserId(Long bookId, Long userId);

    // void deleteByUserAndBook(User user, Book book);
    Borrowings findByBookAndUser(Long bookId, Long userId);

    Optional<Borrowings> findFirstByUser_IdAndBook_Id(Long userId, Long bookId);

    Optional<Borrowings> findByUser_IdAndBook_Id(Long userId, Long bookId);

    List<Borrowings> findByUser_Id(Long userId); 

    Optional<Borrowings> findByBook_Id(Long bookId);

    // void deleteByBookIdAndUserId(Long bookId, Long userId);
    void deleteByUser_IdAndBook_Id(Long userId, Long bookId);

	Borrowings findByBook(Book book);

    // Borrowings findByBookIdAndUserId(Long bookId, Long userId);
    // void deleteByBookIdAndUserId(Long bookId, Long userId);
}
