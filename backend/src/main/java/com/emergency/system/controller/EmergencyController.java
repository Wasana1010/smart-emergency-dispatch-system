package com.emergency.system.controller;

import com.emergency.system.dto.EmergencyRequest;
import com.emergency.system.entity.Emergency;
import com.emergency.system.entity.EmergencyStatus;
import com.emergency.system.entity.EmergencyType;
import com.emergency.system.entity.PatientCondition;
import com.emergency.system.entity.Priority;
import com.emergency.system.service.EmergencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergencies")
public class EmergencyController {

    @Autowired
    private EmergencyService emergencyService;

    @PostMapping
    public ResponseEntity<Emergency> createEmergency(@RequestBody EmergencyRequest request) {
        if (request.getEmergencyType() == null && request.getType() != null) {
            request.setEmergencyType(request.getType());
        }
        if (request.getPatientCondition() == null && request.getCondition() != null) {
            request.setPatientCondition(request.getCondition());
        }
        if (request.getNumberOfPatients() == null && request.getNumPatients() != null) {
            request.setNumberOfPatients(request.getNumPatients());
        }
        if (request.getLatitude() == null && request.getLat() != null) {
            request.setLatitude(request.getLat());
        }
        if (request.getLongitude() == null && request.getLng() != null) {
            request.setLongitude(request.getLng());
        }
        if (request.getDescription() == null && request.getInfo() != null) {
            request.setDescription(request.getInfo());
        }
        if (request.getPriority() == null) {
            request.setPriority("HIGH");
        }

        Emergency emergency = emergencyService.createEmergency(request);
        return ResponseEntity.ok(emergency);
    }

    @GetMapping
    public ResponseEntity<List<Emergency>> getAllEmergencies() {
        return ResponseEntity.ok(emergencyService.getAllEmergencies());
    }
}
