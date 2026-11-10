package com.emergency.system.dto;

import lombok.Data;

@Data
public class AmbulanceRequest {
    private String ambulanceNumber;
    private String registrationNumber;
    private String ambulanceType;
}