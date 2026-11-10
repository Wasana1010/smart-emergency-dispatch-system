package com.emergency.system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "emergency_assignments")
@Data
public class EmergencyAssignment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "emergency_id")
    private Emergency emergency;

    @ManyToOne @JoinColumn(name = "ambulance_id")
    private Ambulance ambulance;

    private Long assignedBy; // Admin User ID
    private LocalDateTime assignedAt = LocalDateTime.now();
    private String assignmentStatus; // e.g., "ACTIVE", "REPLACED"
    private Double distanceKm;
    private Integer estimatedArrivalMinutes;
}