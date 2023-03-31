package com.helloworld.model;

import java.util.*;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Book {
    @Id
    @GeneratedValue()
    private Long id;

    @NonNull
    private String title;

    @NonNull
    private String author;

    @NonNull
    private String isbn;

    private String description;

    @NonNull
    private Integer totalCopies;

    @NonNull
    private Integer availableCopies;

    @ManyToMany(mappedBy = "books")
    private Set<User> users = new HashSet<>();

    public Book orElse(Object object) {
        return null;
    }
}
