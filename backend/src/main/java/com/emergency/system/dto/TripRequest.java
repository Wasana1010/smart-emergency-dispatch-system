package com.emergency.system.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TripRequest {
    @NotNull private Long emergencyId;
    @NotNull private Long ambulanceId;
    private Long hospitalId;
    
    private Double startLatitude;
    private Double startLongitude;
    private Double destinationLatitude;
    private Double destinationLongitude;
    
    private Double distanceKm;
    private Integer estimatedTimeMinutes;
}