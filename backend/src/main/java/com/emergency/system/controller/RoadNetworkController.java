package com.emergency.system.controller;

import com.emergency.system.dto.RoadEdgeRequest;
import com.emergency.system.entity.RoadEdge;
import com.emergency.system.service.RoadNetworkService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roads")
public class RoadNetworkController {
    @Autowired private RoadNetworkService service;

    @PostMapping("/edges")
    public ResponseEntity<RoadEdge> addEdge(@Valid @RequestBody RoadEdgeRequest req) {
        return ResponseEntity.ok(service.createEdge(req));
    }
}