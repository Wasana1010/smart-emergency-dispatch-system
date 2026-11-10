package com.emergency.system.dto;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RoadEdgeRequest {
    @NotNull private Long startNodeId;
    @NotNull private Long endNodeId;
    @NotNull private Double distanceKm;
    @NotNull private Double estimatedTimeMinutes;
    private Boolean isBidirectional = true;
}