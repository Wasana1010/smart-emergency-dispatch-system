package com.emergency.system.algorithm.ambulance;

import com.emergency.system.entity.Ambulance;
import com.emergency.system.entity.AmbulanceStatus;
import com.emergency.system.entity.AmbulanceType;
import com.emergency.system.entity.Emergency;
import com.emergency.system.entity.Priority;
import org.springframework.stereotype.Component;

@Component
public class AmbulanceScorer {

    // Simple Haversine distance formula approximation for lat/long coordinates
    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    public boolean isEligible(Ambulance ambulance, Emergency emergency) {
        // Must be available and have location coordinates recorded
        if (ambulance.getStatus() != AmbulanceStatus.AVAILABLE || 
            ambulance.getLatitude() == null || ambulance.getLongitude() == null) {
            return false;
        }

        // Urgent emergencies prefer Advanced or ICU units; BASIC allowed as fallback
        if (emergency.getPriority() == Priority.URGENT) {
            return ambulance.getAmbulanceType() == AmbulanceType.ADVANCED || 
                   ambulance.getAmbulanceType() == AmbulanceType.ICU ||
                   ambulance.getAmbulanceType() == AmbulanceType.BASIC; // fallback
        }

        return true;
    }

    public double scoreAmbulance(Ambulance ambulance, Emergency emergency) {
        double distance = calculateDistance(
            ambulance.getLatitude(), ambulance.getLongitude(),
            emergency.getLatitude(), emergency.getLongitude()
        );

        // Capability bonus: give a discount score to specialized units for urgent cases
        double capabilityBonus = 0.0;
        if (emergency.getPriority() == Priority.URGENT && 
            (ambulance.getAmbulanceType() == AmbulanceType.ADVANCED || ambulance.getAmbulanceType() == AmbulanceType.ICU)) {
            capabilityBonus = 2.0; // Reduces effective scoring distance
        }

        return distance - capabilityBonus;
    }
}