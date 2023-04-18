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
import org.springframework.web.bind.annotation.PatchMapping;
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

import jakarta.transaction.Transactional;

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

    // get librarian details using id
    @GetMapping("/id/{librarianId}")
    public ResponseEntity<Librarian> getLibrarianById(@PathVariable Long librarianId) {
        Librarian librarian = librarianRepo.findById(librarianId).orElse(null);
        if (librarian == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(librarian);
    }

    // to update librarian details
    @PatchMapping("/id/{librarianId}")
    public ResponseEntity<Librarian> updateDetails(@PathVariable Long librarianId, @RequestBody Librarian librarian) {
        Librarian existingLibrarian = librarianRepo.findById(librarianId).orElse(null);
        if (existingLibrarian == null) {
            return ResponseEntity.notFound().build();
        }
        existingLibrarian.setFirstName(librarian.getFirstName());
        existingLibrarian.setLastName(librarian.getLastName());
        // existingLibrarian.setEmail(librarian.getEmail());
        existingLibrarian.setPassword(librarian.getPassword());
        librarianRepo.save(existingLibrarian);
        return ResponseEntity.ok(existingLibrarian);
    }

    // to issue book to student.
    @PostMapping("/{librarianId}/issue/{bookId}/{userId}")
    public ResponseEntity<?> issueBook(@PathVariable Long librarianId, @PathVariable Long bookId,
            @PathVariable Long userId) {

        Optional<Book> b = bookRepo.findById(bookId);
        Optional<User> u = userRepo.findById(userId);

        System.out.println(b);
        System.out.println(u);

        if (b.isEmpty() || u.isEmpty()) {
            return ResponseEntity.badRequest().body("Book or user not found");
        }

        Book book = bookRepo.getById(bookId);
        User user = userRepo.getById(userId);

        // if(book == null || user == null){
        // return ResponseEntity.notFound().build();
        // }

        Optional<Borrowings> borrowing = borrowingsRepo.findByUser_IdAndBook_Id(userId, bookId);

        System.out.println("borrowing");
        System.out.println(borrowing);

        if (!borrowing.isEmpty()) {
            return ResponseEntity.badRequest().body("Student already owns this book");
        } else {

            Optional<Librarian> librarian = librarianRepo.findById(librarianId);

            // System.out.println(bookRepo.findAll());
            // System.out.println(user);

            if (book.getAvailableCopies() == 0) {
                return ResponseEntity.badRequest().body("Book cannot be issued");
            }

            System.out.println(book.getAvailableCopies());

            // // after saving, suubtract it from available copies
            book.setAvailableCopies(book.getAvailableCopies() - 1);

            // // create new Borrowings object and save it to the database
            Borrowings borrowings = new Borrowings();
            borrowings.setBook(book);
            borrowings.setUser(user);
            // borrowings.setIssuedBy(librarian.get());

            borrowings.setBorrowDate(LocalDateTime.now());
            borrowings.setIssuedAt(LocalDateTime.now());
            LocalDateTime dueDate = LocalDateTime.now().plusDays(7);
            borrowings.setDueDate(dueDate);
            borrowings.setUserId(userId);
            borrowings.setBookId(bookId);

            System.out.println(borrowings);

            borrowingsRepo.save(borrowings);

            bookRepo.save(book);
            user.getBorrowings();

            return ResponseEntity.ok("Book issued successfully");
        }

    }

    // while returning book
    @Transactional
    @PostMapping("/{librarianId}/return/{bookId}/{userId}")
    public ResponseEntity<String> returnBook(@PathVariable Long librarianId, @PathVariable Long bookId,
            @PathVariable Long userId) {
        // Librarian librarian = librarianRepo.findById(librarianId).orElse(null);
        Book book = bookRepo.getById(userId);
        User user = userRepo.getById(userId);

        // System.out.println(borrowingsRepo.findByBook(book));
        // if ( book == null || user == null) {
        // return ResponseEntity.notFound().build();
        // }
        // if (book.isAvailable()) {
        // return ResponseEntity.badRequest().body("Book is already available");
        // }
        // book.setAvailable(true);
        // bookRepo.save(book);
        // user.getBooks().remove(book);
        // userRepo.save(user);
        // // Calculate fine if book is returned late
        // LocalDate dueDate = LocalDate.now().plusDays(14);
        // if (LocalDate.now().isAfter(dueDate)) {
        // long daysLate = ChronoUnit.DAYS.between(dueDate, LocalDate.now());
        // double fine = daysLate * 2.0;
        // return ResponseEntity.ok(String.format("Book returned successfully. Late
        // return fine: $%.2f", fine));
        // }
        // Borrowings b = borrowingsRepo.findByBookIdAndUserId(bookId, userId);
        // Borrowings b = borrowingsRepo.findByBookIdAndUserId(bookId, userId);
        // borrowingsRepo.deleteByUserAndBook(user, book);

        // Optional<Borrowings> b = borrowingsRepo.findByBookAndUser(bookId, userId);
        // System.out.println(b);
        // borrowingsRepo.delete(b);
        Optional<Borrowings> borrowing = borrowingsRepo.findFirstByUser_IdAndBook_Id(bookId, userId);
        System.out.println(borrowing);
        if (borrowing.isPresent()) {
            borrowingsRepo.deleteByUser_IdAndBook_Id(userId, bookId);
            book.setAvailableCopies(book.getAvailableCopies() + 1);
            bookRepo.save(book);
            // borrowingsRepo.save();
            return ResponseEntity.ok().body("Book returned successfully");
        }
        return ResponseEntity.badRequest().body("User doesnt own this book !");
    }

    @GetMapping("/borrowings/all")
    public ResponseEntity<List<Borrowings>> getAllBorrowings() {
        List<Borrowings> borrowings = borrowingsRepo.findAll();
        return ResponseEntity.ok(borrowings);
    }

}
