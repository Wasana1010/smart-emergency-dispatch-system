package com.emergency.system.algorithm.hospital;

import com.emergency.system.entity.Hospital;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HospitalSelectionResult {
    private Hospital selectedHospital;
    private double distanceKm;
    private int availableEmergencyBeds;
    private int availableIcuBeds;
    private String selectionReason;
    private boolean successful;
}