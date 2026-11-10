package com.emergency.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.emergency.system.entity.Ambulance;

public interface AmbulanceRepository extends JpaRepository<Ambulance, Long> {}