package com.emergency.system.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity @Table(name = "road_edges") @Data
public class RoadEdge {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "start_node_id", nullable = false)
    private RoadNode startNode;

    @ManyToOne @JoinColumn(name = "end_node_id", nullable = false)
    private RoadNode endNode;

    private Double distanceKm;
    private Double estimatedTimeMinutes;
    private Boolean isBidirectional = true;

    @Enumerated(EnumType.STRING)
    private EdgeStatus status = EdgeStatus.OPEN;
}