package com.helloworld.controller;

import java.util.Optional;

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
import com.helloworld.model.Borrowings;
import com.helloworld.model.User;
import com.helloworld.repository.BookRepo;
import com.helloworld.repository.BorrowingsRepo;
import com.helloworld.repository.UserRepo;

@RestController
@RequestMapping(path = "/api/v1/user")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private BorrowingsRepo borrowingsRepo;
    // @GetMapping(path = "/getAll")
    // public List<User> getAll(){
    //     return repo.findAll();
    // }
    
    // @PostMapping(path = "/createUser")
    // public void createUser(@RequestBody User user){
    //     repo.save(user);
    //     // return "User created succesfully";
    // }


    // it will create user
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user){
        User check = userRepo.findByEmail(user.getEmail());
        if(check == null){
            userRepo.save(user);
            return ResponseEntity.ok(user);
        } else{
            return ResponseEntity.badRequest().body("User already exist with this email");
        }
    }

    // user login
    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody User user){
        User existingUser = userRepo.findByEmail(user.getEmail());
        if ( existingUser == null || !existingUser.getPassword().equals(user.getPassword())){
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
        return ResponseEntity.ok(existingUser);
    }

    // find user by email
    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email){
        User user = userRepo.findByEmail(email);
        if (user == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    // update first name and lastname of user
    @PutMapping("/{email}")
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User updateUser){
        User existingUser = userRepo.findByEmail(email).orElse(null);
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }
        if (updateUser.getFirstName() != null) {
            existingUser.setFirstName(updateUser.getFirstName());
        }
        if (updateUser.getLastName() != null) {
            existingUser.setLastName(updateUser.getLastName());
        }
        userRepo.save(existingUser);
        return ResponseEntity.ok(existingUser);
    }

    // when user borrows book..

    @PostMapping("/{userId}/borrow/{bookId}")
    public ResponseEntity<User> borrowBook(@PathVariable Long userId, @PathVariable Long bookId){
        User user = userRepo.findById(userId).orElse(null);
        // Book book = bookRepo.findById(bookId);
        Book book = bookRepo.findById(bookId).orElse(null);
        if(  user == null || book == null ){
            return ResponseEntity.notFound().build();
        }

        Borrowings borrowing = new Borrowings(user, book);
        borrowingsRepo.save(borrowing);
    
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id){
        User user = userRepo.findById(id).orElse(null);
        System.out.println(user);
        List<User> all = userRepo.findAll();
        System.out.println(all);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        userRepo.delete(user);
        return ResponseEntity.ok(user);
    }

    // while returnnig book
    @DeleteMapping("/{userId}/borrow/{bookId}")
    public ResponseEntity<User> returnBook(@PathVariable Long userId, @PathVariable Long bookId){
        User user = userRepo.findById(userId).orElse(null);
        // Book book = bookRepo.findById(bookId);
        Book book = bookRepo.findById(bookId).orElse(null);
        if(  user == null || book == null ){
            return ResponseEntity.notFound().build();
        }
        // user.getBooks().remove(book);
        userRepo.save(user);
        return ResponseEntity.ok(user);
    }

    
}
