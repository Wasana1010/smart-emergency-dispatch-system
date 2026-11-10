package com.emergency.system.service;

import com.emergency.system.dto.EmergencyRequest;
import com.emergency.system.entity.Emergency;
import com.emergency.system.entity.EmergencyType;
import com.emergency.system.entity.PatientCondition;
import com.emergency.system.entity.Priority;
import com.emergency.system.repository.EmergencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmergencyService {
    @Autowired private EmergencyRepository emergencyRepository;

    public Emergency createEmergency(EmergencyRequest req) {
        Emergency e = new Emergency();
        e.setRequestNumber("REQ-" + System.currentTimeMillis());

        String typeValue = req.getEmergencyType() != null ? req.getEmergencyType() : req.getType();
        String conditionValue = req.getPatientCondition() != null ? req.getPatientCondition() : req.getCondition();
        String priorityValue = req.getPriority() != null ? req.getPriority() : "HIGH";

        e.setEmergencyType(EmergencyType.valueOf(typeValue.toUpperCase()));
        e.setPatientCondition(PatientCondition.valueOf(conditionValue.toUpperCase()));
        e.setPriority(Priority.valueOf(priorityValue.toUpperCase()));
        e.setNumberOfPatients(req.getNumberOfPatients() != null ? req.getNumberOfPatients() : req.getNumPatients());
        e.setLatitude(req.getLatitude() != null ? req.getLatitude() : req.getLat());
        e.setLongitude(req.getLongitude() != null ? req.getLongitude() : req.getLng());
        e.setDescription(req.getDescription() != null ? req.getDescription() : req.getInfo());
        e.setPreferredHospitalId(req.getPreferredHospitalId());

        return emergencyRepository.save(e);
    }

    public List<Emergency> getAllEmergencies() {
        return emergencyRepository.findAll();
    }
}