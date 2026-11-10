package com.emergency.system.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity @Table(name = "ambulance_drivers") @Data
public class AmbulanceDriver {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @OneToOne
    @JoinColumn(name = "ambulance_id")
    private Ambulance ambulance;

    private String licenseNumber;
    private LocalDate licenseExpiry;
    private Boolean availabilityStatus = true;
}