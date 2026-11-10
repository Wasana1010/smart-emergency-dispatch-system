package com.emergency.system.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class EmergencyResponse {
    private Long id;
    private String requestNumber;
    private Long userId;
    private String emergencyType;
    private String patientCondition;
    private String priority;
    private Integer numberOfPatients;
    private Double latitude;
    private Double longitude;
    private String description;
    private String status;
    private Long assignedAmbulanceId;
    private Long selectedHospitalId;
    private LocalDateTime requestedAt;
    private LocalDateTime updatedAt;
}
