package com.emergency.system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity @Table(name = "road_blockages") @Data
public class RoadBlockage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "road_edge_id", nullable = false)
    private RoadEdge roadEdge;

    private String reason;
    private String description;
    private Long reportedBy; // User ID

    private LocalDateTime startedAt = LocalDateTime.now();
    private LocalDateTime endedAt;

    @Enumerated(EnumType.STRING)
    private BlockageStatus status = BlockageStatus.ACTIVE;
}