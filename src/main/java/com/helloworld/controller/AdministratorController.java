package com.helloworld.controller;

import java.util.List;
import java.time.LocalDate;
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

import com.helloworld.model.Administrator;
import com.helloworld.model.Book;
import com.helloworld.model.Librarian;
import com.helloworld.model.User;
import com.helloworld.repository.AdministratorRepo;
import com.helloworld.repository.BookRepo;
import com.helloworld.repository.LibrarianRepo;
import com.helloworld.repository.UserRepo;

@RestController
@RequestMapping(path = "/api/v1/admin")
public class AdministratorController {
    @Autowired
    private AdministratorRepo adminRepo;

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private LibrarianRepo librarianRepo;

    // to add new admin (it will be done by postman only)
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Administrator admin){
        Administrator existingAdmin = adminRepo.findByEmail(admin.getEmail());
        if(existingAdmin == null){
            adminRepo.save(admin);
            return ResponseEntity.ok(admin);
        }else {
            return ResponseEntity.badRequest().body("Admin already exists with this email");
        }
    }

    // to login admin
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Administrator admin){
        Administrator existingAdmin = adminRepo.findByEmail(admin.getEmail());
        if(existingAdmin != null){
            if(existingAdmin.getPassword().equals(admin.getPassword())){
                return ResponseEntity.ok(existingAdmin);
            }else{
                return ResponseEntity.badRequest().body("Password is incorrect");
            }
        }else{
            return ResponseEntity.badRequest().body("Admin does not exist");
        }
    }

    // to update admin details using id
    @PatchMapping("/id/{id}")
    public ResponseEntity<?> updateAdminById(@PathVariable("id") Long id, @RequestBody Administrator admin){
        Administrator existingAdmin = adminRepo.findById(id).orElse(null);
        if(existingAdmin != null){
            existingAdmin.setFirstName(admin.getFirstName());
            existingAdmin.setLastName(admin.getLastName());
            // existingAdmin.setEmail(admin.getEmail());
            existingAdmin.setPassword(admin.getPassword());
            adminRepo.save(existingAdmin);
            return ResponseEntity.ok(existingAdmin);
        }else{
            return ResponseEntity.badRequest().body("Admin does not exist");
        }
    }

    // get admin details using id
    @GetMapping("/id/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable("id") Long id){
        Administrator admin = adminRepo.findById(id).orElse(null);
        if(admin != null){
            return ResponseEntity.ok(admin);
        }else{
            return ResponseEntity.badRequest().body("Admin does not exist");
        }
    }

    // to get all users
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }

    // to get all librarians
    @GetMapping("/librarians")
    public List<Librarian> getAllLibrarians(){
        return librarianRepo.findAll();
    }

    // to get all books
    @GetMapping("/books")
    public List<Book> getAllBooks(){
        return bookRepo.findAll();
    }

    // to remove user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> removeUser(@PathVariable("id") Long id){
        User user = userRepo.findById(id).orElse(null);
        if(user != null){
            userRepo.delete(user);
            return ResponseEntity.ok("User removed successfully");
        }else{
            return ResponseEntity.badRequest().body("User does not exist");
        }
    }

    // to remove librarian
    @DeleteMapping("/librarians/{id}")
    public ResponseEntity<?> removeLibrarian(@PathVariable("id") Long id){
        Librarian librarian = librarianRepo.findById(id).orElse(null);
        if(librarian != null){
            librarianRepo.delete(librarian);
            return ResponseEntity.ok("Librarian removed successfully");
        }else{
            return ResponseEntity.badRequest().body("Librarian does not exist");
        }
    }

    // to remove book
    @DeleteMapping("/books/{id}")
    public ResponseEntity<?> removeBook(@PathVariable("id") Long id){
        Book book = bookRepo.findById(id).orElse(null);
        if(book != null){
            bookRepo.delete(book);
            return ResponseEntity.ok("Book removed successfully");
        }else{
            return ResponseEntity.badRequest().body("Book does not exist");
        }
    }

}
