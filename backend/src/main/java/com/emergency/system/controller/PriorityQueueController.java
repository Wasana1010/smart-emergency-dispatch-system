package com.emergency.system.controller;

import com.emergency.system.dto.EmergencyResponse;
import com.emergency.system.service.PriorityQueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/emergencies/priority-queue")
public class PriorityQueueController {

    @Autowired
    private PriorityQueueService priorityQueueService;

    @GetMapping
    public ResponseEntity<List<EmergencyResponse>> getPriorityQueue() {
        return ResponseEntity.ok(priorityQueueService.getSortedPriorityQueue());
    }
}