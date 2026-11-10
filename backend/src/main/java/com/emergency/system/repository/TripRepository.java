package com.emergency.system.repository;

import com.emergency.system.entity.Trip;
import com.emergency.system.entity.TripStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByStatus(TripStatus status);
}