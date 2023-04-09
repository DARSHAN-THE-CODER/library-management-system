package com.helloworld.model;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Borrowings {
    public Borrowings(User user2, Book book2) {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NonNull
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @NonNull
    private LocalDateTime borrowDate;

    private LocalDateTime dueDate;

    private LocalDateTime returnDate;

    private BigDecimal fineAmount;

    public void setUser(User user) {
        this.user = user;
    }
    
    public void setBook(Book book) {
        this.book = book;
    }
    
    public void setIssuedBy(Librarian librarian) {
    }

    public void setIssuedAt(LocalDateTime now) {
    }

    public void setUserId(Long id2) {
    }

    public void setBookId(Long id2) {
    }
}
