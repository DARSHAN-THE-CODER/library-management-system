package com.helloworld.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.helloworld.model.Book;
import com.helloworld.model.User;
import com.helloworld.repository.BookRepo;
import com.helloworld.repository.UserRepo;

@RestController
@RequestMapping(path = "/api/v1/book")
public class BookController {

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/")
    public ResponseEntity<List<Book>> getALlBooks(){
        List<Book> books = bookRepo.findAll();
        return ResponseEntity.ok(books);
    }

    // to create book
    @PostMapping("/")
    public ResponseEntity<?> createBook(@RequestBody Book book){
        Book check = bookRepo.findByIsbn(book.getIsbn());
        if(check == null){
            bookRepo.save(book);
            return ResponseEntity.ok(book);
        } else{
            return ResponseEntity.badRequest().body("Book already exist with this isbn");
        }
    }

    // get boko details using book id
    @GetMapping("/{id}")
    public ResponseEntity<?> findBookById(@PathVariable (value = "id") Long bookId ){
        Book book = bookRepo.findById(bookId).orElse(null);
        if ( book == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }

    // to update book details
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable(value = "id") Long bookId,
                                             @RequestBody Book book) {
        Book existingBook = bookRepo.findById(bookId).orElse(null);
        if (existingBook == null) {
            return ResponseEntity.notFound().build();
        }
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setIsbn(book.getIsbn());
        existingBook.setPublisher(book.getPublisher());
        existingBook.setPublicationDate(book.getPublicationDate());
        existingBook.setGenre(book.getGenre());
        bookRepo.save(existingBook);
        return ResponseEntity.ok(existingBook);
    }

    // To get all students who borrowed a book based on the book ID,
    @GetMapping("/{bookId}/borrowers")
    public ResponseEntity<List<User>> getBookBorrowers(@PathVariable Long bookId){
        Book book = bookRepo.findById(bookId).orElse(null);
        if ( book == null){
            return ResponseEntity.notFound().build();
        }
        List<User> borrowers = userRepo.findByBooksContaining(book);
        return ResponseEntity.ok(borrowers);
    }
}
