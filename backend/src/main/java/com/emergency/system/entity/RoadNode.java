package com.emergency.system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity @Table(name = "road_nodes") @Data
public class RoadNode {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Double latitude;
    private Double longitude;

    @Enumerated(EnumType.STRING)
    private NodeType nodeType;

    private LocalDateTime createdAt = LocalDateTime.now();
}