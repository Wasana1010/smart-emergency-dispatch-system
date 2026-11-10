package com.emergency.system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.emergency.system.repository.AmbulanceRepository;
import com.emergency.system.entity.Ambulance;
import com.emergency.system.dto.AmbulanceRequest;
import com.emergency.system.entity.AmbulanceType;

@Service
public class AmbulanceService {
    @Autowired private AmbulanceRepository repository;

    public Ambulance createAmbulance(AmbulanceRequest req) {
        Ambulance amb = new Ambulance();
        amb.setAmbulanceNumber(req.getAmbulanceNumber());
        amb.setRegistrationNumber(req.getRegistrationNumber());
        amb.setAmbulanceType(AmbulanceType.valueOf(req.getAmbulanceType()));
        return repository.save(amb);
    }
}