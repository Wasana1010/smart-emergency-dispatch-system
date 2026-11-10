package com.emergency.system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity @Table(name = "hospitals") @Data
public class Hospital {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    private String address;
    private String phone;
    
    private Double latitude;
    private Double longitude;

    private Integer emergencyCapacity;
    private Integer availableEmergencyBeds;
    private Integer icuCapacity;
    private Integer availableIcuBeds;

    @Enumerated(EnumType.STRING)
    private HospitalStatus status = HospitalStatus.AVAILABLE;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HospitalBed> beds;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}