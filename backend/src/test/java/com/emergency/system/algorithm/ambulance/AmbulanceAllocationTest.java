package com.emergency.system.algorithm.ambulance;

import com.emergency.system.entity.Ambulance;
import com.emergency.system.entity.AmbulanceStatus;
import com.emergency.system.entity.AmbulanceType;
import com.emergency.system.entity.Emergency;
import com.emergency.system.entity.Priority;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AmbulanceAllocationTest {

    @Test
    void testScorerDistanceCalculation() {
        AmbulanceScorer scorer = new AmbulanceScorer();
        // Colombo to Kalutara approximate coordinate check
        double distance = scorer.calculateDistance(6.9271, 79.8612, 6.5854, 79.9607);
        assertTrue(distance > 30.0 && distance < 45.0);
    }

    @Test
    void testEligibilityRules() {
        AmbulanceScorer scorer = new AmbulanceScorer();

        Ambulance amb = new Ambulance();
        amb.setStatus(AmbulanceStatus.AVAILABLE);
        amb.setLatitude(6.58);
        amb.setLongitude(79.96);
        amb.setAmbulanceType(AmbulanceType.ICU);

        Emergency emergency = new Emergency();
        emergency.setPriority(Priority.URGENT);
        emergency.setLatitude(6.59);
        emergency.setLongitude(79.97);

        assertTrue(scorer.isEligible(amb, emergency));
    }
}