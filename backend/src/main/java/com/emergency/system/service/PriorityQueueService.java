package com.emergency.system.service;

import com.emergency.system.algorithm.priority.EmergencyPriorityQueueManager;
import com.emergency.system.dto.EmergencyResponse;
import com.emergency.system.entity.Emergency;
import com.emergency.system.entity.EmergencyStatus;
import com.emergency.system.repository.EmergencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PriorityQueueService {

    @Autowired
    private EmergencyRepository emergencyRepository;

    @Autowired
    private EmergencyPriorityQueueManager queueManager;

    public List<EmergencyResponse> getSortedPriorityQueue() {
        // Fetch all active/pending emergencies from database
        List<Emergency> activeEmergencies = emergencyRepository.findAll().stream()
                .filter(e -> e.getStatus() == EmergencyStatus.PENDING || e.getStatus() == EmergencyStatus.IN_PROGRESS)
                .collect(Collectors.toList());

        // Rebuild heap structure dynamically
        queueManager.clear();
        for (Emergency e : activeEmergencies) {
            queueManager.insert(e);
        }

        // Retrieve sorted order from the heap manager
        List<Emergency> sortedEmergencies = queueManager.getSortedQueueSnapshot();

        // Map to Response DTOs
        return sortedEmergencies.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private EmergencyResponse mapToResponse(Emergency e) {
        EmergencyResponse res = new EmergencyResponse();
        res.setId(e.getId());
        res.setRequestNumber(e.getRequestNumber());
        res.setUserId(e.getUser() != null ? e.getUser().getId() : null);
        res.setEmergencyType(e.getEmergencyType().name());
        res.setPatientCondition(e.getPatientCondition().name());
        res.setPriority(e.getPriority().name());
        res.setNumberOfPatients(e.getNumberOfPatients());
        res.setLatitude(e.getLatitude());
        res.setLongitude(e.getLongitude());
        res.setDescription(e.getDescription());
        res.setStatus(e.getStatus().name());
        res.setAssignedAmbulanceId(null);
        res.setSelectedHospitalId(null);
        res.setRequestedAt(e.getRequestedAt());
        res.setUpdatedAt(e.getUpdatedAt());
        return res;
    }
}