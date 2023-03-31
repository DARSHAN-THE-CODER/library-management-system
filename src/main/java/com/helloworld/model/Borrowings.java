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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @ManyToOne
    private User user;

    @NonNull
    @ManyToOne
    private Book book;

    @NonNull
    private LocalDateTime borrowDate;

    private LocalDateTime returnDate;

    private BigDecimal fineAmount;
}
