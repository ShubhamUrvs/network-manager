package com.network.manager.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "metrics")
public class Metric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double ping;
    private Double jitter;
    private Double packetLoss;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
