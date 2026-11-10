package com.emergency.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.emergency.system.service.AmbulanceService;
import com.emergency.system.entity.Ambulance;
import com.emergency.system.dto.AmbulanceRequest;

@RestController
@RequestMapping("/api/ambulances")
public class AmbulanceController {
    @Autowired private AmbulanceService service;

    @PostMapping
    public ResponseEntity<Ambulance> add(@RequestBody AmbulanceRequest req) {
        return ResponseEntity.ok(service.createAmbulance(req));
    }
}