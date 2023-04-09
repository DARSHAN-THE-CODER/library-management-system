package com.helloworld.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

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
import com.helloworld.model.Borrowings;
import com.helloworld.model.Librarian;
import com.helloworld.model.User;
import com.helloworld.repository.BookRepo;
import com.helloworld.repository.BorrowingsRepo;
import com.helloworld.repository.LibrarianRepo;
import com.helloworld.repository.UserRepo;

@RestController
@RequestMapping(path = "/api/v1/librarian")
public class LibrarianController {

    @Autowired
    private LibrarianRepo librarianRepo;

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BorrowingsRepo borrowingsRepo;

    // adding new librarian
    @PostMapping("/signup")
    public ResponseEntity<Librarian> signUp(@RequestBody Librarian librarian) {
        librarianRepo.save(librarian);
        return ResponseEntity.ok(librarian);
    }

    // librarian login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Librarian librarian) {
        Librarian existingLibrarian = librarianRepo.findByEmail(librarian.getEmail());
        if (existingLibrarian == null) {
            return ResponseEntity.badRequest().body("Librarian not found");
        } else if (!existingLibrarian.getPassword().equals(librarian.getPassword())) {
            return ResponseEntity.badRequest().body("Incorrect password");
        }
        return ResponseEntity.ok(existingLibrarian);
    }

    // to update librarian details
    @PutMapping("/{librarianId}")
    public ResponseEntity<Librarian> updateDetails(@PathVariable Long librarianId, @RequestBody Librarian librarian) {
        Librarian existingLibrarian = librarianRepo.findById(librarianId).orElse(null);
        if (existingLibrarian == null) {
            return ResponseEntity.notFound().build();
        }
        existingLibrarian.setFirstName(librarian.getFirstName());
        existingLibrarian.setLastName(librarian.getLastName());
        existingLibrarian.setEmail(librarian.getEmail());
        existingLibrarian.setPassword(librarian.getPassword());
        librarianRepo.save(existingLibrarian);
        return ResponseEntity.ok(existingLibrarian);
    }

    // to issue book to student.
    @PostMapping("/{librarianId}/issue/{bookId}/{userId}")
    public ResponseEntity<?> issueBook(@PathVariable Long librarianId, @PathVariable Long bookId,
            @PathVariable Long userId) {

        Optional<Librarian> librarian = librarianRepo.findById(librarianId);
        Book book = bookRepo.findById(bookId);
        User user = userRepo.findById(userId);
        System.out.println(bookRepo.findAll());
        System.out.println(book);
        System.out.println(user);

        if (book == null || user == null) {
            return ResponseEntity.notFound().build();
        }

        if (book.getAvailableCopies() == 0) {
            return ResponseEntity.badRequest().body("Book cannot be issued");
        }

        // after saving, suubtract it from available copies
        book.setAvailableCopies(book.getAvailableCopies() - 1);

        // create new Borrowings object and save it to the database
        Borrowings borrowings = new Borrowings();
        borrowings.setBook(book);
        borrowings.setUser(user);
        borrowings.setBorrowDate(LocalDateTime.now());
        borrowings.setIssuedBy(librarian.get());
        borrowings.setIssuedAt(LocalDateTime.now());
        borrowings.setUserId(user.getId());
        borrowings.setBookId(book.getId());


        System.out.println(borrowings);

        borrowingsRepo.save(borrowings);
        
        bookRepo.save(book);
        // User actualUser = user.get();
        user.getBooks().add(book);
        userRepo.save(user);

        return ResponseEntity.ok("Book issued successfully");
    }

    // while returning book
    // @PostMapping("/{librarianId}/return/{bookId}/{userId}")
    // public ResponseEntity<String> returnBook(@PathVariable Long librarianId, @PathVariable Long bookId,
    //         @PathVariable Long userId) {
    //     Librarian librarian = librarianRepo.findById(librarianId).orElse(null);
    //     Book book = bookRepo.findById(bookId).orElse(null);
    //     User user = userRepo.findById(userId).orElse(null);
    //     if (librarian == null || book == null || user == null) {
    //         return ResponseEntity.notFound().build();
    //     }
    //     if (book.isAvailable()) {
    //         return ResponseEntity.badRequest().body("Book is already available");
    //     }
    //     book.setAvailable(true);
    //     bookRepo.save(book);
    //     user.getBooks().remove(book);
    //     userRepo.save(user);
    //     // Calculate fine if book is returned late
    //     LocalDate dueDate = LocalDate.now().plusDays(14);
    //     if (LocalDate.now().isAfter(dueDate)) {
    //         long daysLate = ChronoUnit.DAYS.between(dueDate, LocalDate.now());
    //         double fine = daysLate * 2.0;
    //         return ResponseEntity.ok(String.format("Book returned successfully. Late return fine: $%.2f", fine));
    //     }
    //     return ResponseEntity.ok("Book returned successfully");
    // }
}
