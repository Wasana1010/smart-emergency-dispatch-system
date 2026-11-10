package com.emergency.system.service;

import com.emergency.system.algorithm.hospital.HospitalSelectionResult;
import com.emergency.system.entity.Emergency;
import com.emergency.system.entity.Hospital;
import com.emergency.system.entity.HospitalStatus;
import com.emergency.system.entity.PatientCondition;
import com.emergency.system.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalSelectionService {

    @Autowired
    private HospitalRepository hospitalRepository;

    public HospitalSelectionResult selectBestHospital(Emergency emergency, double incidentLat, double incidentLon) {
        List<Hospital> hospitals = hospitalRepository.findAll();

        Hospital bestHospital = null;
        double minScore = Double.MAX_VALUE;
        double bestDistance = 0.0;

        boolean requiresIcu = emergency.getPatientCondition() == PatientCondition.CRITICAL;

        for (Hospital hospital : hospitals) {
            if (!isEligible(hospital, requiresIcu)) {
                continue;
            }

            double distance = calculateDistance(incidentLat, incidentLon, hospital.getLatitude(), hospital.getLongitude());
            
            // Scoring calculation
            double score = distance;
            if (requiresIcu) {
                // Penalize hospitals with fewer ICU beds to balance proximity with heavy specialization need
                score -= (hospital.getAvailableIcuBeds() * 0.5); 
            } else {
                score -= (hospital.getAvailableEmergencyBeds() * 0.2);
            }

            if (score < minScore) {
                minScore = score;
                bestHospital = hospital;
                bestDistance = distance;
            }
        }

        if (bestHospital == null) {
            return new HospitalSelectionResult(null, 0.0, 0, 0, "No eligible hospitals found with required bed capacity.", false);
        }

        String reason = String.format("Selected %s located %.2f km away. Available Emergency Beds: %d, Available ICU Beds: %d (Condition: %s).",
                bestHospital.getName(), bestDistance, bestHospital.getAvailableEmergencyBeds(), 
                bestHospital.getAvailableIcuBeds(), emergency.getPatientCondition());

        return new HospitalSelectionResult(
                bestHospital,
                bestDistance,
                bestHospital.getAvailableEmergencyBeds(),
                bestHospital.getAvailableIcuBeds(),
                reason,
                true
        );
    }

    private boolean isEligible(Hospital hospital, boolean requiresIcu) {
        if (hospital.getStatus() == HospitalStatus.CLOSED || hospital.getStatus() == HospitalStatus.FULL) {
            return false;
        }

        if (requiresIcu) {
            return hospital.getAvailableIcuBeds() != null && hospital.getAvailableIcuBeds() > 0;
        } else {
            return hospital.getAvailableEmergencyBeds() != null && hospital.getAvailableEmergencyBeds() > 0;
        }
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth radius in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon1 - lon1); // Fixed lon calculation bug
        // Correct Haversine longitudinal delta
        lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}