package com.emergency.system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "emergencies")
@Data
public class Emergency {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String requestNumber;
    
    @ManyToOne @JoinColumn(name = "user_id")
    private User user;
    
    @Enumerated(EnumType.STRING) private EmergencyType emergencyType;
    @Enumerated(EnumType.STRING) private PatientCondition patientCondition;
    @Enumerated(EnumType.STRING) private Priority priority;
    
    private Integer numberOfPatients;
    private Double latitude;
    private Double longitude;
    private String description;
    
    private Long preferredHospitalId;
    
    @Enumerated(EnumType.STRING)
    private EmergencyStatus status = EmergencyStatus.PENDING;
    
    private LocalDateTime requestedAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}