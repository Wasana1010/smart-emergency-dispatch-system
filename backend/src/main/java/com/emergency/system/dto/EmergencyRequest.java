package com.emergency.system.dto;

import lombok.Data;

@Data
public class EmergencyRequest {
    private String emergencyType;
    private String patientCondition;
    private String priority;
    private Integer numberOfPatients;
    private Double latitude;
    private Double longitude;
    private String description;
    private Long preferredHospitalId;

    private String type;
    private String condition;
    private Integer numPatients;
    private Double lat;
    private Double lng;
    private String info;
    private String hospital;
}
