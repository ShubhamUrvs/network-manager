package com.network.manager.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "suggestions")
public class Suggestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private String severity; // RED, YELLOW, GREEN

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
