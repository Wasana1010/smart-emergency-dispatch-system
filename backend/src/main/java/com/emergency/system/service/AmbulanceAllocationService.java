package com.emergency.system.service;

import com.emergency.system.algorithm.ambulance.AllocationResult;
import com.emergency.system.algorithm.ambulance.AmbulanceScorer;
import com.emergency.system.entity.Ambulance;
import com.emergency.system.entity.Emergency;
import com.emergency.system.repository.AmbulanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AmbulanceAllocationService {

    @Autowired
    private AmbulanceRepository ambulanceRepository;

    @Autowired
    private AmbulanceScorer ambulanceScorer;

    public AllocationResult allocateBestAmbulance(Emergency emergency) {
        List<Ambulance> allAmbulances = ambulanceRepository.findAll();

        Ambulance bestAmbulance = null;
        double minScore = Double.MAX_VALUE;
        double bestDistance = 0.0;

        for (Ambulance ambulance : allAmbulances) {
            if (ambulanceScorer.isEligible(ambulance, emergency)) {
                double score = ambulanceScorer.scoreAmbulance(ambulance, emergency);
                if (score < minScore) {
                    minScore = score;
                    bestAmbulance = ambulance;
                    bestDistance = ambulanceScorer.calculateDistance(
                        ambulance.getLatitude(), ambulance.getLongitude(),
                        emergency.getLatitude(), emergency.getLongitude()
                    );
                }
            }
        }

        if (bestAmbulance == null) {
            return new AllocationResult(null, 0.0, 0, "No available ambulances match criteria.", false);
        }

        // Assuming an average urban speed of 40 km/h -> time in minutes = (distance / 40) * 60
        int estimatedMinutes = (int) Math.ceil((bestDistance / 40.0) * 60);
        if (estimatedMinutes < 1) estimatedMinutes = 1;

        String reasoning = String.format("Selected unit %s (Type: %s) based on optimal proximity (%.2f km) and priority alignment.",
                bestAmbulance.getAmbulanceNumber(), bestAmbulance.getAmbulanceType(), bestDistance);

        return new AllocationResult(bestAmbulance, bestDistance, estimatedMinutes, reasoning, true);
    }
}