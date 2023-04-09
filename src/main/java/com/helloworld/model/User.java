package com.helloworld.model;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue()
    private Long id;

    @NonNull
    private String firstName;

    @NonNull
    private String lastName;

    @NonNull
    private String email;

    @NonNull
    private String password;

    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    // private Set<Borrowings> borrowings = new HashSet<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "borrowings",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id"))
    private Set<Book> borrowings = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "user_book",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private Set<Book> books = new HashSet<>();
    
    public Object getName() {
        return null;
    }

    public void setName(Object name) {
    }

    public Object getAddress() {
        return null;
    }

    public void setAddress(Object address) {
    }

    public User orElse(Object object) {
        return null;
    }

    public User get() {
        return null;
    }

    public List<Book> getBooks() {
        return null;
    }
}
