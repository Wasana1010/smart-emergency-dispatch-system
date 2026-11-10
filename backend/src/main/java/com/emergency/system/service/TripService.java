package com.emergency.system.service;

import com.emergency.system.dto.TripRequest;
import com.emergency.system.dto.TripResponse;
import com.emergency.system.entity.*;
import com.emergency.system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TripService {
    @Autowired private TripRepository tripRepository;
    @Autowired private EmergencyRepository emergencyRepository;
    @Autowired private AmbulanceRepository ambulanceRepository;
    @Autowired private HospitalRepository hospitalRepository;

    public TripResponse startTrip(TripRequest req) {
        Emergency emergency = emergencyRepository.findById(req.getEmergencyId())
                .orElseThrow(() -> new RuntimeException("Emergency not found"));
        Ambulance ambulance = ambulanceRepository.findById(req.getAmbulanceId())
                .orElseThrow(() -> new RuntimeException("Ambulance not found"));

        Trip trip = new Trip();
        trip.setEmergency(emergency);
        trip.setAmbulance(ambulance);
        
        if (req.getHospitalId() != null) {
            Hospital hospital = hospitalRepository.findById(req.getHospitalId())
                    .orElseThrow(() -> new RuntimeException("Hospital not found"));
            trip.setHospital(hospital);
        }

        trip.setStartLatitude(req.getStartLatitude());
        trip.setStartLongitude(req.getStartLongitude());
        trip.setDestinationLatitude(req.getDestinationLatitude());
        trip.setDestinationLongitude(req.getDestinationLongitude());
        trip.setDistanceKm(req.getDistanceKm());
        trip.setEstimatedTimeMinutes(req.getEstimatedTimeMinutes());
        trip.setStatus(TripStatus.STARTED);

        Trip saved = tripRepository.save(trip);
        return mapToResponse(saved);
    }

    public TripResponse updateTripStatus(Long tripId, String status) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        
        TripStatus newStatus = TripStatus.valueOf(status);
        trip.setStatus(newStatus);
        
        if (newStatus == TripStatus.COMPLETED) {
            trip.setCompletedAt(LocalDateTime.now());
        }

        Trip updated = tripRepository.save(trip);
        return mapToResponse(updated);
    }

    private TripResponse mapToResponse(Trip t) {
        TripResponse res = new TripResponse();
        res.setId(t.getId());
        res.setEmergencyId(t.getEmergency().getId());
        res.setAmbulanceId(t.getAmbulance().getId());
        res.setHospitalId(t.getHospital() != null ? t.getHospital().getId() : null);
        res.setDistanceKm(t.getDistanceKm());
        res.setEstimatedTimeMinutes(t.getEstimatedTimeMinutes());
        res.setActualTimeMinutes(t.getActualTimeMinutes());
        res.setStatus(t.getStatus().name());
        res.setStartedAt(t.getStartedAt());
        res.setCompletedAt(t.getCompletedAt());
        return res;
    }
}