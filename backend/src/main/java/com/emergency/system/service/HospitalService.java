package com.emergency.system.service;

import com.emergency.system.dto.HospitalRequest;
import com.emergency.system.entity.Hospital;
import com.emergency.system.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HospitalService {
    @Autowired private HospitalRepository repository;

    public Hospital createHospital(HospitalRequest req) {
        Hospital h = new Hospital();
        h.setName(req.getName());
        h.setAddress(req.getAddress());
        h.setLatitude(req.getLatitude());
        h.setLongitude(req.getLongitude());
        h.setEmergencyCapacity(req.getEmergencyCapacity());
        h.setAvailableEmergencyBeds(req.getEmergencyCapacity()); // Initialize available to max
        h.setIcuCapacity(req.getIcuCapacity());
        h.setAvailableIcuBeds(req.getIcuCapacity());
        return repository.save(h);
    }
}