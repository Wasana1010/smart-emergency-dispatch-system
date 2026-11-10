package com.emergency.system.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TripResponse {
    private Long id;
    private Long emergencyId;
    private Long ambulanceId;
    private Long hospitalId;
    private Double distanceKm;
    private Integer estimatedTimeMinutes;
    private Integer actualTimeMinutes;
    private String status;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
}