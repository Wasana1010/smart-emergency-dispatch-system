package com.emergency.system.controller;

import com.emergency.system.dto.TripRequest;
import com.emergency.system.dto.TripResponse;
import com.emergency.system.service.TripService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips")
public class TripController {
    @Autowired private TripService tripService;

    @PostMapping
    public ResponseEntity<TripResponse> startTrip(@Valid @RequestBody TripRequest req) {
        return ResponseEntity.ok(tripService.startTrip(req));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TripResponse> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(tripService.updateTripStatus(id, status));
    }
}