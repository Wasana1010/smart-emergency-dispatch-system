package com.emergency.system.controller;

import com.emergency.system.dto.HospitalRequest;
import com.emergency.system.entity.Hospital;
import com.emergency.system.service.HospitalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {
    @Autowired private HospitalService service;

    @PostMapping
    public ResponseEntity<Hospital> add(@Valid @RequestBody HospitalRequest req) {
        return ResponseEntity.ok(service.createHospital(req));
    }
}