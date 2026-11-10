package com.emergency.system.algorithm.ambulance;

import com.emergency.system.entity.Ambulance;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllocationResult {
    private Ambulance selectedAmbulance;
    private double distanceKm;
    private int estimatedArrivalMinutes;
    private String reasoning;
    private boolean successful;
}