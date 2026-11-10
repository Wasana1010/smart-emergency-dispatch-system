package com.emergency.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.emergency.system.entity.AmbulanceDriver;

public interface AmbulanceDriverRepository extends JpaRepository<AmbulanceDriver, Long> {}