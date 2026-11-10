package com.emergency.system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity @Table(name = "ambulances") @Data
public class Ambulance {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String ambulanceNumber;
    
    private String registrationNumber;
    
    @Enumerated(EnumType.STRING)
    private AmbulanceType ambulanceType; // BASIC, ADVANCED, ICU
    
    @Enumerated(EnumType.STRING)
    private AmbulanceStatus status = AmbulanceStatus.AVAILABLE;
    
    private Double latitude;
    private Double longitude;
    private String equipmentLevel;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}